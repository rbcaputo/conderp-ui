import { EntityType } from "../../../resources/types/entityTypes.enum"

export type NotificationGetDto = {
  publicId: string,
  name: string,
  sendDate: Date,
  entityType: EntityType,
  entityPublicId: string,
  message: string,
  seen: boolean | undefined
};
