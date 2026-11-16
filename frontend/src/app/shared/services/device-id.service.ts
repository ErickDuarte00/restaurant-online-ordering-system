// device-id.service.ts
import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from '@services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class DeviceIdService {
  private localStorageService = inject(LocalStorageService);

  private readonly DEVICE_ID_KEY = 'device_id';

  /**
   * Get the current device ID from local storage
   */
  getDeviceId(): string | null {
    return this.localStorageService.getItem<string>(this.DEVICE_ID_KEY);
  }

  /**
   * Set the device ID in local storage
   */
  setDeviceId(deviceId: string): void {
    this.localStorageService.setItem(this.DEVICE_ID_KEY, deviceId);
  }

  /**
   * Clear the device ID from local storage
   */
  clearDeviceId(): void {
    this.localStorageService.removeItem(this.DEVICE_ID_KEY);
  }

  /**
   * Check if a device ID exists
   */
  hasDeviceId(): boolean {
    return this.getDeviceId() !== null;
  }

  /**
   * Generate a new device ID (UUID v4 format compatible with Django UUIDField)
   */
  generateDeviceId(): string {
    let newDeviceId: string;
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      newDeviceId = crypto.randomUUID();
    } else {
      newDeviceId = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
    this.setDeviceId(newDeviceId);
    return newDeviceId;
  }

  /**
   * Validate device ID format (must be valid UUID)
   */
  isValidDeviceId(deviceId: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return typeof deviceId === 'string' && uuidRegex.test(deviceId);
  }

  /**
   * Get device ID with validation
   * Automatically generates and stores a new device ID if none exists
   */
  getValidDeviceId(): string {
    let deviceId = this.getDeviceId();
    if (!deviceId || !this.isValidDeviceId(deviceId)) {
      deviceId = this.generateDeviceId();
    }
    return deviceId;
  }

  /**
   * Initialize device ID - useful for app startup
   */
  initializeDeviceId(): string {
    return this.getValidDeviceId();
  }

  /**
   * Check if device ID needs to be refreshed (optional feature)
   * For example, if device ID is too old
   */
  shouldRefreshDeviceId(): boolean {
    // Implement logic if you want to refresh device IDs after certain time
    // For now, always return false as device IDs should be persistent
    return false;
  }

  /**
   * Get device ID info for debugging
   */
  getDeviceInfo(): { exists: boolean; value: string | null; isValid: boolean } {
    const deviceId = this.getDeviceId();
    return {
      exists: this.hasDeviceId(),
      value: deviceId,
      isValid: deviceId ? this.isValidDeviceId(deviceId) : false,
    };
  }
}
