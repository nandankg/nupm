/**
 * Incident Management Validation Schemas
 * 
 * Railway-specific validation schemas for all incident-related forms.
 * These schemas ensure data accuracy and safety compliance for incident reporting.
 */

import { 
  dateSchema, 
  timeSchema, 
  employeeIdSchema, 
  employeeNameSchema,
  stationCodeSchema,
  descriptionSchema,
  remarksSchema,
  signalNumberSchema,
  customValidators
} from './commonSchemas.js';

// Incident Register Signals Schema (used across multiple developers)
export const incidentRegisterSignalsSchema = {
  // Basic incident information
  date: {
    ...dateSchema,
    validate: {
      ...dateSchema.validate,
      railwayDate: customValidators.isValidRailwayDate
    }
  },
  
  time: {
    ...timeSchema,
    validate: {
      workingHours: customValidators.isWorkingHours
    }
  },
  
  station: stationCodeSchema,
  
  // Incident details
  incidentType: {
    required: {
      value: true,
      message: 'Incident type is required'
    },
    validate: {
      validType: (value) => {
        const validTypes = [
          'signal-failure',
          'track-defect', 
          'equipment-malfunction',
          'safety-violation',
          'operational-delay',
          'weather-related',
          'human-error',
          'other'
        ];
        return validTypes.includes(value) || 'Please select a valid incident type';
      }
    }
  },
  
  severity: {
    required: {
      value: true,
      message: 'Incident severity is required'
    },
    validate: {
      validSeverity: (value) => {
        const validSeverities = ['minor', 'moderate', 'major', 'critical'];
        return validSeverities.includes(value) || 'Please select a valid severity level';
      }
    }
  },
  
  description: {
    ...descriptionSchema,
    minLength: {
      value: 25,
      message: 'Incident description must be at least 25 characters for safety compliance'
    }
  },
  
  location: {
    required: {
      value: true,
      message: 'Incident location is required'
    },
    minLength: {
      value: 5,
      message: 'Location description must be at least 5 characters'
    }
  },
  
  // Personnel information
  reportedBy: employeeIdSchema,
  reporterName: employeeNameSchema,
  designation: {
    required: {
      value: true,
      message: 'Reporter designation is required'
    }
  },
  
  // Optional but validated fields
  signalNumber: {
    ...signalNumberSchema,
    required: false // Optional unless signal-related incident
  },
  
  trainNumber: {
    pattern: {
      value: /^\d{5}$/,
      message: 'Train number must be exactly 5 digits'
    }
  },
  
  kilometrage: {
    pattern: {
      value: /^\d{1,4}\/\d{1,4}$/,
      message: 'Kilometrage must be in format: 123/456'
    }
  },
  
  // Action taken
  immediateAction: {
    required: {
      value: true,
      message: 'Immediate action taken is required for safety compliance'
    },
    minLength: {
      value: 10,
      message: 'Action description must be at least 10 characters'
    }
  },
  
  reportedTo: {
    required: {
      value: true,
      message: 'Reported to (authority) is required'
    }
  },
  
  // Additional information
  witnessDetails: {
    maxLength: {
      value: 200,
      message: 'Witness details cannot exceed 200 characters'
    }
  },
  
  remarks: remarksSchema,
  
  // Follow-up information
  followUpRequired: {
    required: {
      value: true,
      message: 'Please specify if follow-up is required'
    }
  }
};

// Accident Report Schema (more stringent than incidents)
export const accidentReportSchema = {
  ...incidentRegisterSignalsSchema,
  
  // Override severity - accidents are always major or critical
  severity: {
    required: {
      value: true,
      message: 'Accident severity is required'
    },
    validate: {
      accidentSeverity: (value) => {
        const validSeverities = ['major', 'critical'];
        return validSeverities.includes(value) || 'Accidents must be classified as major or critical';
      }
    }
  },
  
  // Additional required fields for accidents
  injuries: {
    required: {
      value: true,
      message: 'Injury details are required for accident reports'
    }
  },
  
  damageDetails: {
    required: {
      value: true,
      message: 'Damage assessment is required for accident reports'
    },
    minLength: {
      value: 20,
      message: 'Damage details must be at least 20 characters'
    }
  },
  
  emergencyServicesNotified: {
    required: {
      value: true,
      message: 'Please confirm if emergency services were notified'
    }
  },
  
  policeComplaint: {
    validate: {
      requiredForMajor: (value, formValues) => {
        if (formValues.severity === 'critical' && !value) {
          return 'Police complaint number is required for critical accidents';
        }
        return true;
      }
    }
  }
};

// Safety Protocol Violation Schema
export const safetyViolationSchema = {
  date: dateSchema,
  time: timeSchema,
  station: stationCodeSchema,
  
  violationType: {
    required: {
      value: true,
      message: 'Safety violation type is required'
    },
    validate: {
      validType: (value) => {
        const validTypes = [
          'ppp-violation',
          'speed-limit-breach',
          'signal-passing',
          'safety-equipment-misuse',
          'unauthorized-access',
          'procedure-deviation',
          'other'
        ];
        return validTypes.includes(value) || 'Please select a valid violation type';
      }
    }
  },
  
  violatingEmployee: employeeIdSchema,
  violatorName: employeeNameSchema,
  
  witnessEmployee: employeeIdSchema,
  witnessName: employeeNameSchema,
  
  actionTaken: {
    required: {
      value: true,
      message: 'Disciplinary action taken is required'
    }
  },
  
  description: {
    ...descriptionSchema,
    minLength: {
      value: 30,
      message: 'Safety violation description must be at least 30 characters'
    }
  }
};

// Emergency Drill Report Schema
export const emergencyDrillSchema = {
  date: dateSchema,
  startTime: timeSchema,
  endTime: {
    ...timeSchema,
    validate: {
      afterStartTime: (endTime, formValues) => {
        if (formValues.startTime && endTime <= formValues.startTime) {
          return 'End time must be after start time';
        }
        return true;
      }
    }
  },
  
  drillType: {
    required: {
      value: true,
      message: 'Emergency drill type is required'
    },
    validate: {
      validDrillType: (value) => {
        const validTypes = ['fire-drill', 'evacuation-drill', 'medical-emergency', 'security-drill'];
        return validTypes.includes(value) || 'Please select a valid drill type';
      }
    }
  },
  
  station: stationCodeSchema,
  conductedBy: employeeIdSchema,
  participantCount: {
    required: {
      value: true,
      message: 'Number of participants is required'
    },
    min: {
      value: 1,
      message: 'At least 1 participant is required'
    },
    max: {
      value: 500,
      message: 'Participant count seems too high, please verify'
    }
  },
  
  objectives: {
    required: {
      value: true,
      message: 'Drill objectives are required'
    }
  },
  
  observations: {
    required: {
      value: true,
      message: 'Drill observations are required'
    },
    minLength: {
      value: 20,
      message: 'Observations must be at least 20 characters'
    }
  },
  
  improvements: remarksSchema
};

// Dynamic validation rules based on incident type
export const getDynamicValidationRules = (incidentType) => {
  const baseRules = incidentRegisterSignalsSchema;
  
  switch (incidentType) {
    case 'signal-failure':
      return {
        ...baseRules,
        signalNumber: {
          ...baseRules.signalNumber,
          required: {
            value: true,
            message: 'Signal number is required for signal failure incidents'
          }
        }
      };
      
    case 'track-defect':
      return {
        ...baseRules,
        kilometrage: {
          ...baseRules.kilometrage,
          required: {
            value: true,
            message: 'Track kilometrage is required for track defect incidents'
          }
        }
      };
      
    case 'operational-delay':
      return {
        ...baseRules,
        trainNumber: {
          ...baseRules.trainNumber,
          required: {
            value: true,
            message: 'Train number is required for operational delay incidents'
          }
        },
        delayDuration: {
          required: {
            value: true,
            message: 'Delay duration is required'
          },
          min: {
            value: 1,
            message: 'Delay must be at least 1 minute'
          }
        }
      };
      
    default:
      return baseRules;
  }
};

export default {
  incidentRegisterSignalsSchema,
  accidentReportSchema,
  safetyViolationSchema,
  emergencyDrillSchema,
  getDynamicValidationRules
};