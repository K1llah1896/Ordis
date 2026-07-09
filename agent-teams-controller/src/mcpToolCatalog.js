const ORDIS_TEAM_TOOL_NAMES = ['team_list', 'team_get', 'team_create'];

const ORDIS_TASK_TOOL_NAMES = [
  'member_briefing',
  'task_add_comment',
  'task_attach_comment_file',
  'task_attach_file',
  'task_briefing',
  'task_complete',
  'task_create',
  'task_create_from_message',
  'task_get',
  'task_get_comment',
  'task_link',
  'task_list',
  'task_restore',
  'task_set_clarification',
  'task_set_owner',
  'task_set_status',
  'task_start',
  'task_unlink',
];

const ORDIS_LEAD_TOOL_NAMES = ['lead_briefing'];

const ORDIS_REVIEW_TOOL_NAMES = [
  'review_approve',
  'review_request',
  'review_request_changes',
  'review_start',
];

const ORDIS_MESSAGE_TOOL_NAMES = ['message_send'];

const ORDIS_CROSS_TEAM_TOOL_NAMES = [
  'cross_team_get_outbox',
  'cross_team_list_targets',
  'cross_team_send',
];

const ORDIS_PROCESS_TOOL_NAMES = [
  'process_list',
  'process_register',
  'process_stop',
  'process_unregister',
];

const ORDIS_KANBAN_TOOL_NAMES = [
  'kanban_add_reviewer',
  'kanban_clear',
  'kanban_get',
  'kanban_list_reviewers',
  'kanban_remove_reviewer',
  'kanban_set_column',
];

const ORDIS_RUNTIME_TOOL_NAMES = [
  'team_launch',
  'team_stop',
  'runtime_bootstrap_checkin',
  'runtime_deliver_message',
  'runtime_task_event',
  'runtime_heartbeat',
];

const ORDIS_WORK_SYNC_TOOL_NAMES = ['member_work_sync_status', 'member_work_sync_report'];

const ORDIS_MCP_TOOL_GROUPS = [
  {
    id: 'team',
    teammateOperational: false,
    toolNames: ORDIS_TEAM_TOOL_NAMES,
  },
  {
    id: 'task',
    teammateOperational: true,
    toolNames: ORDIS_TASK_TOOL_NAMES,
  },
  {
    id: 'lead',
    teammateOperational: false,
    toolNames: ORDIS_LEAD_TOOL_NAMES,
  },
  {
    id: 'kanban',
    teammateOperational: false,
    toolNames: ORDIS_KANBAN_TOOL_NAMES,
  },
  {
    id: 'review',
    teammateOperational: true,
    toolNames: ORDIS_REVIEW_TOOL_NAMES,
  },
  {
    id: 'message',
    teammateOperational: true,
    toolNames: ORDIS_MESSAGE_TOOL_NAMES,
  },
  {
    id: 'process',
    teammateOperational: true,
    toolNames: ORDIS_PROCESS_TOOL_NAMES,
  },
  {
    id: 'runtime',
    teammateOperational: false,
    toolNames: ORDIS_RUNTIME_TOOL_NAMES,
  },
  {
    id: 'workSync',
    teammateOperational: true,
    toolNames: ORDIS_WORK_SYNC_TOOL_NAMES,
  },
  {
    id: 'crossTeam',
    teammateOperational: true,
    toolNames: ORDIS_CROSS_TEAM_TOOL_NAMES,
  },
];

const ORDIS_REGISTERED_TOOL_NAMES = ORDIS_MCP_TOOL_GROUPS.flatMap((group) => [
  ...group.toolNames,
]);

const ORDIS_TEAMMATE_OPERATIONAL_TOOL_NAMES = ORDIS_MCP_TOOL_GROUPS.filter(
  (group) => group.teammateOperational
).flatMap((group) => [...group.toolNames]);

const ORDIS_NAMESPACED_TEAMMATE_OPERATIONAL_TOOL_NAMES =
  ORDIS_TEAMMATE_OPERATIONAL_TOOL_NAMES.map((toolName) => `mcp__agent-teams__${toolName}`);

const ORDIS_LEAD_BOOTSTRAP_TOOL_NAMES = [
  ...ORDIS_TEAMMATE_OPERATIONAL_TOOL_NAMES,
  ...ORDIS_LEAD_TOOL_NAMES,
];

const ORDIS_NAMESPACED_LEAD_BOOTSTRAP_TOOL_NAMES = ORDIS_LEAD_BOOTSTRAP_TOOL_NAMES.map(
  (toolName) => `mcp__agent-teams__${toolName}`
);

module.exports = {
  ORDIS_TEAM_TOOL_NAMES,
  ORDIS_TASK_TOOL_NAMES,
  ORDIS_LEAD_TOOL_NAMES,
  ORDIS_REVIEW_TOOL_NAMES,
  ORDIS_MESSAGE_TOOL_NAMES,
  ORDIS_CROSS_TEAM_TOOL_NAMES,
  ORDIS_PROCESS_TOOL_NAMES,
  ORDIS_KANBAN_TOOL_NAMES,
  ORDIS_RUNTIME_TOOL_NAMES,
  ORDIS_WORK_SYNC_TOOL_NAMES,
  ORDIS_MCP_TOOL_GROUPS,
  ORDIS_REGISTERED_TOOL_NAMES,
  ORDIS_TEAMMATE_OPERATIONAL_TOOL_NAMES,
  ORDIS_NAMESPACED_TEAMMATE_OPERATIONAL_TOOL_NAMES,
  ORDIS_LEAD_BOOTSTRAP_TOOL_NAMES,
  ORDIS_NAMESPACED_LEAD_BOOTSTRAP_TOOL_NAMES,
};
