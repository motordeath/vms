import React from 'react';
import { AlertTriangle, AlertCircle, Clock, Info } from 'lucide-react';
import { Alert } from '../../types';

interface AlertListProps {
  alerts: Alert[];
  limit?: number;
}

const AlertList: React.FC<AlertListProps> = ({ alerts, limit }) => {
  const displayAlerts = limit ? alerts.slice(0, limit) : alerts;
  
  // Format timestamp
  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Get alert icon based on type
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'overspeed':
        return <AlertTriangle size={18} className="text-amber-400" />;
      case 'lowFuel':
        return <Info size={18} className="text-blue-400" />;
      case 'highTemperature':
        return <AlertCircle size={18} className="text-red-500" />;
      case 'maintenance':
        return <Info size={18} className="text-blue-400" />;
      case 'geofence':
        return <AlertTriangle size={18} className="text-purple-400" />;
      default:
        return <Info size={18} className="text-[#a3b18a]" />;
    }
  };
  
  // Get severity class
  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'high': return 'alert-high';
      case 'medium': return 'alert-medium';
      case 'low': return 'alert-low';
      default: return '';
    }
  };
  
  return (
    <div className="card h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Alerts ({alerts.length})</h3>
        {alerts.length > 0 && (
          <button className="text-sm text-[#588157] hover:text-[#a3b18a] transition-colors">
            View All
          </button>
        )}
      </div>
      
      {displayAlerts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8">
          <Info size={40} className="text-[#3a5a40] mb-2" />
          <p className="text-[#a3b18a]">No notifications yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {displayAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`${getSeverityClass(alert.severity)} rounded-md p-3 flex items-start`}
            >
              <div className="shrink-0 mr-3">
                {getAlertIcon(alert.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{alert.message}</p>
                <div className="flex items-center mt-1 text-xs text-[#a3b18a]">
                  <Clock size={12} className="mr-1" />
                  <span>{formatTimestamp(alert.timestamp)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertList;