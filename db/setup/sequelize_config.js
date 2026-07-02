const Sequelize = require("sequelize").Sequelize;

const envVars = require("../../config/env_vars_config");

// Core auth models
const _User = require("../models/user.model");
const _AdminUser = require("../models/admin_user.model");
const _Role = require("../models/role.model");
const _UserRole = require("../models/user_role.model");
const _Permission = require("../models/permission.model");
const _RolePermission = require("../models/role_permission.model");
const _EmailOtp = require("../models/email_otp.model");
const _AuditLog = require("../models/audit_log.model");
const _RefreshToken = require("../models/refresh_token.model");
const _LoginHistory = require("../models/login_history.model");

// Organization models
const _Company = require("../models/company.model");
const _Store = require("../models/store.model");
const _StoreCategory = require("../models/store_category.model");
const _StoreContact = require("../models/store_contact.model");

// Location models
const _Country = require("../models/country.model");
const _State = require("../models/state.model");
const _City = require("../models/city.model");
const _Area = require("../models/area.model");
const _StoreLocation = require("../models/store_location.model");

// Device models
const _DeviceGroup = require("../models/device_group.model");
const _Device = require("../models/device.model");
const _DeviceAssignment = require("../models/device_assignment.model");
const _DeviceHeartbeat = require("../models/device_heartbeat.model");
const _DeviceHealth = require("../models/device_health.model");
const _DeviceStorage = require("../models/device_storage.model");
const _DeviceNetwork = require("../models/device_network.model");
const _DeviceConfiguration = require("../models/device_configuration.model");
const _DeviceLog = require("../models/device_log.model");
const _DeviceCommand = require("../models/device_command.model");
const _DeviceScreenshot = require("../models/device_screenshot.model");

// Advertisement & Files models
const _Advertisement = require("../models/advertisement.model");
const _MediaFile = require("../models/media_file.model");
const _MediaVersion = require("../models/media_version.model");
const _Thumbnail = require("../models/thumbnail.model");
const _MediaTag = require("../models/media_tag.model");
const _AdvertisementTag = require("../models/advertisement_tag.model");

// Playlist models
const _Playlist = require("../models/playlist.model");
const _PlaylistItem = require("../models/playlist_item.model");
const _PlaylistVersion = require("../models/playlist_version.model");

// Campaign models
const _CampaignPriority = require("../models/campaign_priority.model");
const _Campaign = require("../models/campaign.model");
const _CampaignPlaylist = require("../models/campaign_playlist.model");
const _CampaignTarget = require("../models/campaign_target.model");
const _CampaignSchedule = require("../models/campaign_schedule.model");
const _CampaignTimeSlot = require("../models/campaign_time_slot.model");
const _CampaignStatusHistory = require("../models/campaign_status_history.model");

// Playback models
const _PlaylistExecution = require("../models/playlist_execution.model");
const _AdvertisementImpression = require("../models/advertisement_impression.model");
const _AdvertisementPlaybackError = require("../models/advertisement_playback_error.model");
const _PlaybackHistory = require("../models/playback_history.model");

// Notification models
const _Notification = require("../models/notification.model");
const _NotificationRecipient = require("../models/notification_recipient.model");
const _NotificationPreference = require("../models/notification_preference.model");

// Support models
const _SupportTicket = require("../models/support_ticket.model");
const _SupportComment = require("../models/support_comment.model");
const _SupportAttachment = require("../models/support_attachment.model");

const sequelize_instance = new Sequelize(
    envVars.db_name,
    envVars.db_user,
    envVars.db_password,
    {
        dialect: envVars.db_dialect,
        logging: process.env.DB_LOGGING === "enabled",
        host: envVars.db_host,
        port: envVars.db_port,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000,
        },
        dialectModule: require("mysql2"),
    }
);

// Initialise models

// Core auth
const UserModel = _User(sequelize_instance);
const AdminUserModel = _AdminUser(sequelize_instance);
const RoleModel = _Role(sequelize_instance);
const UserRoleModel = _UserRole(sequelize_instance);
const PermissionModel = _Permission(sequelize_instance);
const RolePermissionModel = _RolePermission(sequelize_instance);
const EmailOtpModel = _EmailOtp(sequelize_instance);
const AuditLogModel = _AuditLog(sequelize_instance);
const RefreshTokenModel = _RefreshToken(sequelize_instance);
const LoginHistoryModel = _LoginHistory(sequelize_instance);

// Organization
const CompanyModel = _Company(sequelize_instance);
const StoreModel = _Store(sequelize_instance);
const StoreCategoryModel = _StoreCategory(sequelize_instance);
const StoreContactModel = _StoreContact(sequelize_instance);

// Location
const CountryModel = _Country(sequelize_instance);
const StateModel = _State(sequelize_instance);
const CityModel = _City(sequelize_instance);
const AreaModel = _Area(sequelize_instance);
const StoreLocationModel = _StoreLocation(sequelize_instance);

// Devices
const DeviceGroupModel = _DeviceGroup(sequelize_instance);
const DeviceModel = _Device(sequelize_instance);
const DeviceAssignmentModel = _DeviceAssignment(sequelize_instance);
const DeviceHeartbeatModel = _DeviceHeartbeat(sequelize_instance);
const DeviceHealthModel = _DeviceHealth(sequelize_instance);
const DeviceStorageModel = _DeviceStorage(sequelize_instance);
const DeviceNetworkModel = _DeviceNetwork(sequelize_instance);
const DeviceConfigurationModel = _DeviceConfiguration(sequelize_instance);
const DeviceLogModel = _DeviceLog(sequelize_instance);
const DeviceCommandModel = _DeviceCommand(sequelize_instance);
const DeviceScreenshotModel = _DeviceScreenshot(sequelize_instance);

// Advertisement & Files
const AdvertisementModel = _Advertisement(sequelize_instance);
const MediaFileModel = _MediaFile(sequelize_instance);
const MediaVersionModel = _MediaVersion(sequelize_instance);
const ThumbnailModel = _Thumbnail(sequelize_instance);
const MediaTagModel = _MediaTag(sequelize_instance);
const AdvertisementTagModel = _AdvertisementTag(sequelize_instance);

// Playlist
const PlaylistModel = _Playlist(sequelize_instance);
const PlaylistItemModel = _PlaylistItem(sequelize_instance);
const PlaylistVersionModel = _PlaylistVersion(sequelize_instance);

// Campaign
const CampaignPriorityModel = _CampaignPriority(sequelize_instance);
const CampaignModel = _Campaign(sequelize_instance);
const CampaignPlaylistModel = _CampaignPlaylist(sequelize_instance);
const CampaignTargetModel = _CampaignTarget(sequelize_instance);
const CampaignScheduleModel = _CampaignSchedule(sequelize_instance);
const CampaignTimeSlotModel = _CampaignTimeSlot(sequelize_instance);
const CampaignStatusHistoryModel = _CampaignStatusHistory(sequelize_instance);

// Playback
const PlaylistExecutionModel = _PlaylistExecution(sequelize_instance);
const AdvertisementImpressionModel = _AdvertisementImpression(sequelize_instance);
const AdvertisementPlaybackErrorModel = _AdvertisementPlaybackError(sequelize_instance);
const PlaybackHistoryModel = _PlaybackHistory(sequelize_instance);

// Notifications
const NotificationModel = _Notification(sequelize_instance);
const NotificationRecipientModel = _NotificationRecipient(sequelize_instance);
const NotificationPreferenceModel = _NotificationPreference(sequelize_instance);

// Support
const SupportTicketModel = _SupportTicket(sequelize_instance);
const SupportCommentModel = _SupportComment(sequelize_instance);
const SupportAttachmentModel = _SupportAttachment(sequelize_instance);


// ── Associations ──────────────────────────────────────────────────────

// User ↔ Role (many-to-many through user_roles)
UserModel.belongsToMany(RoleModel, {
    through: UserRoleModel,
    foreignKey: 'user_id',
    otherKey: 'role_id',
    as: 'roles'
});
RoleModel.belongsToMany(UserModel, {
    through: UserRoleModel,
    foreignKey: 'role_id',
    otherKey: 'user_id',
    as: 'users'
});

// AdminUser ↔ Role (many-to-many through user_roles)
AdminUserModel.belongsToMany(RoleModel, {
    through: UserRoleModel,
    foreignKey: 'admin_user_id',
    otherKey: 'role_id',
    as: 'roles'
});
RoleModel.belongsToMany(AdminUserModel, {
    through: UserRoleModel,
    foreignKey: 'role_id',
    otherKey: 'admin_user_id',
    as: 'admin_users'
});

// Role ↔ Permission (many-to-many through role_permissions)
RoleModel.belongsToMany(PermissionModel, {
    through: RolePermissionModel,
    foreignKey: 'role_id',
    otherKey: 'permission_id',
    as: 'permissions'
});
PermissionModel.belongsToMany(RoleModel, {
    through: RolePermissionModel,
    foreignKey: 'permission_id',
    otherKey: 'role_id',
    as: 'roles'
});

// AuditLog ↔ AdminUser
AdminUserModel.hasMany(AuditLogModel, { foreignKey: 'admin_user_id', as: 'audit_logs' });
AuditLogModel.belongsTo(AdminUserModel, { foreignKey: 'admin_user_id', as: 'admin_user' });

// Company ↔ User / AdminUser / Role
CompanyModel.hasMany(UserModel, { foreignKey: 'company_id', as: 'users' });
UserModel.belongsTo(CompanyModel, { foreignKey: 'company_id', as: 'company' });

CompanyModel.hasMany(AdminUserModel, { foreignKey: 'company_id', as: 'admin_users' });
AdminUserModel.belongsTo(CompanyModel, { foreignKey: 'company_id', as: 'company' });

CompanyModel.hasMany(RoleModel, { foreignKey: 'company_id', as: 'roles' });
RoleModel.belongsTo(CompanyModel, { foreignKey: 'company_id', as: 'company' });

// User ↔ RefreshToken / LoginHistory
UserModel.hasMany(RefreshTokenModel, { foreignKey: 'user_id', as: 'refresh_tokens' });
RefreshTokenModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });

UserModel.hasMany(LoginHistoryModel, { foreignKey: 'user_id', as: 'login_histories' });
LoginHistoryModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });

// ── Organization ──────────────────────────────────────────────────────

CompanyModel.hasMany(StoreModel, { foreignKey: 'company_id', as: 'stores' });
StoreModel.belongsTo(CompanyModel, { foreignKey: 'company_id', as: 'company' });

StoreCategoryModel.hasMany(StoreModel, { foreignKey: 'store_category_id', as: 'stores' });
StoreModel.belongsTo(StoreCategoryModel, { foreignKey: 'store_category_id', as: 'store_category' });

StoreModel.hasMany(StoreContactModel, { foreignKey: 'store_id', as: 'contacts' });
StoreContactModel.belongsTo(StoreModel, { foreignKey: 'store_id', as: 'store' });

// ── Location ──────────────────────────────────────────────────────────

CountryModel.hasMany(StateModel, { foreignKey: 'country_id', as: 'states' });
StateModel.belongsTo(CountryModel, { foreignKey: 'country_id', as: 'country' });

StateModel.hasMany(CityModel, { foreignKey: 'state_id', as: 'cities' });
CityModel.belongsTo(StateModel, { foreignKey: 'state_id', as: 'state' });

CityModel.hasMany(AreaModel, { foreignKey: 'city_id', as: 'areas' });
AreaModel.belongsTo(CityModel, { foreignKey: 'city_id', as: 'city' });

StoreModel.hasMany(StoreLocationModel, { foreignKey: 'store_id', as: 'locations' });
StoreLocationModel.belongsTo(StoreModel, { foreignKey: 'store_id', as: 'store' });

AreaModel.hasMany(StoreLocationModel, { foreignKey: 'area_id', as: 'store_locations' });
StoreLocationModel.belongsTo(AreaModel, { foreignKey: 'area_id', as: 'area' });

StoreLocationModel.belongsTo(CountryModel, { foreignKey: 'country_id', as: 'country' });
StoreLocationModel.belongsTo(StateModel, { foreignKey: 'state_id', as: 'state' });
StoreLocationModel.belongsTo(CityModel, { foreignKey: 'city_id', as: 'city' });

// ── Devices ───────────────────────────────────────────────────────────

CompanyModel.hasMany(DeviceGroupModel, { foreignKey: 'company_id', as: 'device_groups' });
DeviceGroupModel.belongsTo(CompanyModel, { foreignKey: 'company_id', as: 'company' });

CompanyModel.hasMany(DeviceModel, { foreignKey: 'company_id', as: 'devices' });
DeviceModel.belongsTo(CompanyModel, { foreignKey: 'company_id', as: 'company' });

StoreLocationModel.hasMany(DeviceModel, { foreignKey: 'store_location_id', as: 'devices' });
DeviceModel.belongsTo(StoreLocationModel, { foreignKey: 'store_location_id', as: 'store_location' });

DeviceGroupModel.hasMany(DeviceModel, { foreignKey: 'current_group_id', as: 'devices' });
DeviceModel.belongsTo(DeviceGroupModel, { foreignKey: 'current_group_id', as: 'current_group' });

DeviceGroupModel.hasMany(DeviceAssignmentModel, { foreignKey: 'device_group_id', as: 'assignments' });
DeviceAssignmentModel.belongsTo(DeviceGroupModel, { foreignKey: 'device_group_id', as: 'device_group' });

DeviceModel.hasMany(DeviceAssignmentModel, { foreignKey: 'device_id', as: 'assignments' });
DeviceAssignmentModel.belongsTo(DeviceModel, { foreignKey: 'device_id', as: 'device' });

DeviceModel.hasMany(DeviceHeartbeatModel, { foreignKey: 'device_id', as: 'heartbeats' });
DeviceHeartbeatModel.belongsTo(DeviceModel, { foreignKey: 'device_id', as: 'device' });

DeviceModel.hasMany(DeviceHealthModel, { foreignKey: 'device_id', as: 'health_snapshots' });
DeviceHealthModel.belongsTo(DeviceModel, { foreignKey: 'device_id', as: 'device' });

DeviceModel.hasMany(DeviceStorageModel, { foreignKey: 'device_id', as: 'storage_snapshots' });
DeviceStorageModel.belongsTo(DeviceModel, { foreignKey: 'device_id', as: 'device' });

DeviceModel.hasMany(DeviceNetworkModel, { foreignKey: 'device_id', as: 'network_snapshots' });
DeviceNetworkModel.belongsTo(DeviceModel, { foreignKey: 'device_id', as: 'device' });

DeviceModel.hasOne(DeviceConfigurationModel, { foreignKey: 'device_id', as: 'configuration' });
DeviceConfigurationModel.belongsTo(DeviceModel, { foreignKey: 'device_id', as: 'device' });

DeviceModel.hasMany(DeviceLogModel, { foreignKey: 'device_id', as: 'logs' });
DeviceLogModel.belongsTo(DeviceModel, { foreignKey: 'device_id', as: 'device' });

DeviceModel.hasMany(DeviceCommandModel, { foreignKey: 'device_id', as: 'commands' });
DeviceCommandModel.belongsTo(DeviceModel, { foreignKey: 'device_id', as: 'device' });

DeviceModel.hasMany(DeviceScreenshotModel, { foreignKey: 'device_id', as: 'screenshots' });
DeviceScreenshotModel.belongsTo(DeviceModel, { foreignKey: 'device_id', as: 'device' });

// ── Advertisement & Files ─────────────────────────────────────────────

CompanyModel.hasMany(AdvertisementModel, { foreignKey: 'company_id', as: 'advertisements' });
AdvertisementModel.belongsTo(CompanyModel, { foreignKey: 'company_id', as: 'company' });

AdvertisementModel.hasMany(MediaFileModel, { foreignKey: 'advertisement_id', as: 'media_files' });
MediaFileModel.belongsTo(AdvertisementModel, { foreignKey: 'advertisement_id', as: 'advertisement' });

MediaFileModel.hasMany(MediaVersionModel, { foreignKey: 'media_file_id', as: 'versions' });
MediaVersionModel.belongsTo(MediaFileModel, { foreignKey: 'media_file_id', as: 'media_file' });

MediaFileModel.belongsTo(MediaVersionModel, { foreignKey: 'current_version_id', as: 'current_version' });
MediaVersionModel.hasOne(MediaFileModel, { foreignKey: 'current_version_id', as: 'current_for' });

MediaFileModel.hasMany(ThumbnailModel, { foreignKey: 'media_file_id', as: 'thumbnails' });
ThumbnailModel.belongsTo(MediaFileModel, { foreignKey: 'media_file_id', as: 'media_file' });

MediaTagModel.hasMany(AdvertisementTagModel, { foreignKey: 'media_tag_id', as: 'advertisement_tags' });
AdvertisementTagModel.belongsTo(MediaTagModel, { foreignKey: 'media_tag_id', as: 'media_tag' });

AdvertisementModel.hasMany(AdvertisementTagModel, { foreignKey: 'advertisement_id', as: 'tags' });
AdvertisementTagModel.belongsTo(AdvertisementModel, { foreignKey: 'advertisement_id', as: 'advertisement' });

// ── Playlist ──────────────────────────────────────────────────────────

CompanyModel.hasMany(PlaylistModel, { foreignKey: 'company_id', as: 'playlists' });
PlaylistModel.belongsTo(CompanyModel, { foreignKey: 'company_id', as: 'company' });

PlaylistModel.hasMany(PlaylistItemModel, { foreignKey: 'playlist_id', as: 'items' });
PlaylistItemModel.belongsTo(PlaylistModel, { foreignKey: 'playlist_id', as: 'playlist' });

AdvertisementModel.hasMany(PlaylistItemModel, { foreignKey: 'advertisement_id', as: 'playlist_items' });
PlaylistItemModel.belongsTo(AdvertisementModel, { foreignKey: 'advertisement_id', as: 'advertisement' });

PlaylistModel.hasMany(PlaylistVersionModel, { foreignKey: 'playlist_id', as: 'versions' });
PlaylistVersionModel.belongsTo(PlaylistModel, { foreignKey: 'playlist_id', as: 'playlist' });

PlaylistModel.belongsTo(PlaylistVersionModel, { foreignKey: 'current_version_id', as: 'current_version' });

// ── Campaign ──────────────────────────────────────────────────────────

CampaignPriorityModel.hasMany(CampaignModel, { foreignKey: 'priority_id', as: 'campaigns' });
CampaignModel.belongsTo(CampaignPriorityModel, { foreignKey: 'priority_id', as: 'priority' });

CompanyModel.hasMany(CampaignModel, { foreignKey: 'company_id', as: 'campaigns' });
CampaignModel.belongsTo(CompanyModel, { foreignKey: 'company_id', as: 'company' });

CampaignModel.hasMany(CampaignPlaylistModel, { foreignKey: 'campaign_id', as: 'campaign_playlists' });
CampaignPlaylistModel.belongsTo(CampaignModel, { foreignKey: 'campaign_id', as: 'campaign' });

PlaylistModel.hasMany(CampaignPlaylistModel, { foreignKey: 'playlist_id', as: 'campaign_playlists' });
CampaignPlaylistModel.belongsTo(PlaylistModel, { foreignKey: 'playlist_id', as: 'playlist' });

CampaignModel.hasMany(CampaignTargetModel, { foreignKey: 'campaign_id', as: 'targets' });
CampaignTargetModel.belongsTo(CampaignModel, { foreignKey: 'campaign_id', as: 'campaign' });

CampaignModel.hasMany(CampaignScheduleModel, { foreignKey: 'campaign_id', as: 'schedules' });
CampaignScheduleModel.belongsTo(CampaignModel, { foreignKey: 'campaign_id', as: 'campaign' });

CampaignScheduleModel.hasMany(CampaignTimeSlotModel, { foreignKey: 'campaign_schedule_id', as: 'time_slots' });
CampaignTimeSlotModel.belongsTo(CampaignScheduleModel, { foreignKey: 'campaign_schedule_id', as: 'schedule' });

CampaignModel.hasMany(CampaignStatusHistoryModel, { foreignKey: 'campaign_id', as: 'status_history' });
CampaignStatusHistoryModel.belongsTo(CampaignModel, { foreignKey: 'campaign_id', as: 'campaign' });

// ── Playback ──────────────────────────────────────────────────────────

DeviceModel.hasMany(PlaylistExecutionModel, { foreignKey: 'device_id', as: 'playlist_executions' });
PlaylistExecutionModel.belongsTo(DeviceModel, { foreignKey: 'device_id', as: 'device' });

PlaylistModel.hasMany(PlaylistExecutionModel, { foreignKey: 'playlist_id', as: 'executions' });
PlaylistExecutionModel.belongsTo(PlaylistModel, { foreignKey: 'playlist_id', as: 'playlist' });

CampaignModel.hasMany(PlaylistExecutionModel, { foreignKey: 'campaign_id', as: 'playlist_executions' });
PlaylistExecutionModel.belongsTo(CampaignModel, { foreignKey: 'campaign_id', as: 'campaign' });

PlaylistExecutionModel.hasMany(AdvertisementImpressionModel, { foreignKey: 'playlist_execution_id', as: 'impressions' });
AdvertisementImpressionModel.belongsTo(PlaylistExecutionModel, { foreignKey: 'playlist_execution_id', as: 'playlist_execution' });

DeviceModel.hasMany(AdvertisementImpressionModel, { foreignKey: 'device_id', as: 'impressions' });
AdvertisementImpressionModel.belongsTo(DeviceModel, { foreignKey: 'device_id', as: 'device' });

AdvertisementModel.hasMany(AdvertisementImpressionModel, { foreignKey: 'advertisement_id', as: 'impressions' });
AdvertisementImpressionModel.belongsTo(AdvertisementModel, { foreignKey: 'advertisement_id', as: 'advertisement' });

CampaignModel.hasMany(AdvertisementImpressionModel, { foreignKey: 'campaign_id', as: 'impressions' });
AdvertisementImpressionModel.belongsTo(CampaignModel, { foreignKey: 'campaign_id', as: 'campaign' });

PlaylistExecutionModel.hasMany(AdvertisementPlaybackErrorModel, { foreignKey: 'playlist_execution_id', as: 'playback_errors' });
AdvertisementPlaybackErrorModel.belongsTo(PlaylistExecutionModel, { foreignKey: 'playlist_execution_id', as: 'playlist_execution' });

DeviceModel.hasMany(AdvertisementPlaybackErrorModel, { foreignKey: 'device_id', as: 'playback_errors' });
AdvertisementPlaybackErrorModel.belongsTo(DeviceModel, { foreignKey: 'device_id', as: 'device' });

AdvertisementModel.hasMany(AdvertisementPlaybackErrorModel, { foreignKey: 'advertisement_id', as: 'playback_errors' });
AdvertisementPlaybackErrorModel.belongsTo(AdvertisementModel, { foreignKey: 'advertisement_id', as: 'advertisement' });

CampaignModel.hasMany(AdvertisementPlaybackErrorModel, { foreignKey: 'campaign_id', as: 'playback_errors' });
AdvertisementPlaybackErrorModel.belongsTo(CampaignModel, { foreignKey: 'campaign_id', as: 'campaign' });

DeviceModel.hasMany(PlaybackHistoryModel, { foreignKey: 'device_id', as: 'playback_histories' });
PlaybackHistoryModel.belongsTo(DeviceModel, { foreignKey: 'device_id', as: 'device' });

// ── Notifications ─────────────────────────────────────────────────────

CompanyModel.hasMany(NotificationModel, { foreignKey: 'company_id', as: 'notifications' });
NotificationModel.belongsTo(CompanyModel, { foreignKey: 'company_id', as: 'company' });

NotificationModel.hasMany(NotificationRecipientModel, { foreignKey: 'notification_id', as: 'recipients' });
NotificationRecipientModel.belongsTo(NotificationModel, { foreignKey: 'notification_id', as: 'notification' });

UserModel.hasMany(NotificationRecipientModel, { foreignKey: 'user_id', as: 'notification_recipients' });
NotificationRecipientModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });

UserModel.hasMany(NotificationPreferenceModel, { foreignKey: 'user_id', as: 'notification_preferences' });
NotificationPreferenceModel.belongsTo(UserModel, { foreignKey: 'user_id', as: 'user' });

// ── Support ───────────────────────────────────────────────────────────

CompanyModel.hasMany(SupportTicketModel, { foreignKey: 'company_id', as: 'support_tickets' });
SupportTicketModel.belongsTo(CompanyModel, { foreignKey: 'company_id', as: 'company' });

UserModel.hasMany(SupportTicketModel, { foreignKey: 'requester_id', as: 'requested_tickets' });
SupportTicketModel.belongsTo(UserModel, { foreignKey: 'requester_id', as: 'requester' });

UserModel.hasMany(SupportTicketModel, { foreignKey: 'assignee_id', as: 'assigned_tickets' });
SupportTicketModel.belongsTo(UserModel, { foreignKey: 'assignee_id', as: 'assignee' });

SupportTicketModel.hasMany(SupportCommentModel, { foreignKey: 'ticket_id', as: 'comments' });
SupportCommentModel.belongsTo(SupportTicketModel, { foreignKey: 'ticket_id', as: 'ticket' });

UserModel.hasMany(SupportCommentModel, { foreignKey: 'author_id', as: 'support_comments' });
SupportCommentModel.belongsTo(UserModel, { foreignKey: 'author_id', as: 'author' });

SupportTicketModel.hasMany(SupportAttachmentModel, { foreignKey: 'ticket_id', as: 'attachments' });
SupportAttachmentModel.belongsTo(SupportTicketModel, { foreignKey: 'ticket_id', as: 'ticket' });

SupportCommentModel.hasMany(SupportAttachmentModel, { foreignKey: 'comment_id', as: 'attachments' });
SupportAttachmentModel.belongsTo(SupportCommentModel, { foreignKey: 'comment_id', as: 'comment' });

module.exports = sequelize_instance;
