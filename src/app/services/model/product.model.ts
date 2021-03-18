import { User } from './user.model';

export interface Product {
  INVNumber: number;
  productName: string;
  description: string;
  volume: string;
  weight: number;
  sender: string;
  receiver: string;
  receiptDate: Date;
  scheduledShipmentDate: Date;
  arrivalDate: Date;
  shipmentDate: Date;
  isPresent: boolean;
  isProcessed: boolean;
  loadedByEmployee: User;
  sentByEmployeeId: User;
}
