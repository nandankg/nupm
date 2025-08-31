import { apiService, clearCache } from './apiService';
import { API_ENDPOINTS } from '../config/apiConfig';

// Operation Service for centralized business logic
class OperationService {
  
  // Generic save data method
  async saveData(formType, data) {
    try {
      const response = await apiService.post(API_ENDPOINTS.operation.save, {
        formType,
        ...data
      });
      
      // Clear related cache after successful save
      clearCache(`operation/${formType}`);
      clearCache('operation/viewData');
      
      return response;
    } catch (error) {
      throw new Error(`Failed to save ${formType}: ${error.message}`);
    }
  }

  // Generic view data method with caching
  async viewData(formType, useCache = true) {
    try {
      const url = API_ENDPOINTS.operation.viewData;
      const data = { formType };
      
      if (useCache) {
        return await apiService.get(`${url}?formType=${formType}`);
      } else {
        return await apiService.post(url, data);
      }
    } catch (error) {
      throw new Error(`Failed to fetch ${formType}: ${error.message}`);
    }
  }

  // Generic edit data method
  async editData(formType, data) {
    try {
      const response = await apiService.post(API_ENDPOINTS.operation.edit, {
        formType,
        ...data
      });
      
      // Clear related cache after successful edit
      clearCache(`operation/${formType}`);
      clearCache('operation/viewData');
      
      return response;
    } catch (error) {
      throw new Error(`Failed to edit ${formType}: ${error.message}`);
    }
  }

  // Specific methods for common operations
  
  // Incident Management
  async saveIncident(incidentData) {
    return this.saveData('incident-register-signals', incidentData);
  }

  async getIncidents() {
    return this.viewData('incident-register-signals');
  }

  // Equipment Failure
  async saveEquipmentFailure(failureData) {
    return this.saveData('equipment-failure-register', failureData);
  }

  // Export functionality
  async exportData(formType, format = 'excel') {
    try {
      return await apiService.post(API_ENDPOINTS.operation.export, {
        formType,
        format
      });
    } catch (error) {
      throw new Error(`Failed to export ${formType}: ${error.message}`);
    }
  }
}

// Export singleton instance
export const operationService = new OperationService();
export default operationService;