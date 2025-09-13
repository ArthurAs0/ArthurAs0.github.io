// Mock data service to replace Wix data
export interface WixDataItem {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
}

export interface WixDataResult<T> {
  items: T[];
  totalCount: number;
}

// Mock CRUD Service
export class BaseCrudService {
  private static getStorageKey(collectionId: string): string {
    return `mock-data-${collectionId}`;
  }

  private static getData<T>(collectionId: string): T[] {
    if (typeof window === 'undefined') return [];
    
    try {
      const data = localStorage.getItem(this.getStorageKey(collectionId));
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  private static saveData<T>(collectionId: string, data: T[]): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.getStorageKey(collectionId), JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  }

  static async create<T extends WixDataItem>(collectionId: string, itemData: T): Promise<T> {
    try {
      const data = this.getData<T>(collectionId);
      const newItem = {
        ...itemData,
        _id: itemData._id || crypto.randomUUID(),
        _createdDate: new Date(),
        _updatedDate: new Date()
      };
      
      data.push(newItem);
      this.saveData(collectionId, data);
      return newItem;
    } catch (error) {
      console.error(`Error creating ${collectionId}:`, error);
      throw new Error(`Failed to create ${collectionId}`);
    }
  }

  static async getAll<T extends WixDataItem>(collectionId: string): Promise<WixDataResult<T>> {
    try {
      const data = this.getData<T>(collectionId);
      return {
        items: data,
        totalCount: data.length
      };
    } catch (error) {
      console.error(`Error fetching ${collectionId}s:`, error);
      throw new Error(`Failed to fetch ${collectionId}s`);
    }
  }

  static async getById<T extends WixDataItem>(collectionId: string, itemId: string): Promise<T | null> {
    try {
      const data = this.getData<T>(collectionId);
      const item = data.find(item => item._id === itemId);
      return item || null;
    } catch (error) {
      console.error(`Error fetching ${collectionId} by ID:`, error);
      throw new Error(`Failed to fetch ${collectionId}`);
    }
  }

  static async update<T extends WixDataItem>(collectionId: string, itemData: T): Promise<T> {
    try {
      if (!itemData._id) {
        throw new Error(`${collectionId} ID is required for update`);
      }

      const data = this.getData<T>(collectionId);
      const index = data.findIndex(item => item._id === itemData._id);
      
      if (index === -1) {
        throw new Error(`${collectionId} not found`);
      }

      const updatedItem = {
        ...itemData,
        _updatedDate: new Date()
      };
      
      data[index] = updatedItem;
      this.saveData(collectionId, data);
      return updatedItem;
    } catch (error) {
      console.error(`Error updating ${collectionId}:`, error);
      throw new Error(`Failed to update ${collectionId}`);
    }
  }

  static async delete<T extends WixDataItem>(collectionId: string, itemId: string): Promise<T> {
    try {
      if (!itemId) {
        throw new Error(`${collectionId} ID is required for deletion`);
      }

      const data = this.getData<T>(collectionId);
      const index = data.findIndex(item => item._id === itemId);
      
      if (index === -1) {
        throw new Error(`${collectionId} not found`);
      }

      const deletedItem = data[index];
      data.splice(index, 1);
      this.saveData(collectionId, data);
      return deletedItem;
    } catch (error) {
      console.error(`Error deleting ${collectionId}:`, error);
      throw new Error(`Failed to delete ${collectionId}`);
    }
  }
}
