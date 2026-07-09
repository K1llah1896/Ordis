import type { FastMCP } from 'fastmcp';

import agentTeamsControllerModule from 'agent-teams-controller';

const { ORDIS_MCP_TOOL_GROUPS, ORDIS_REGISTERED_TOOL_NAMES } =
  agentTeamsControllerModule;

import { registerCrossTeamTools } from './crossTeamTools';
import { registerKanbanTools } from './kanbanTools';
import { registerLeadTools } from './leadTools';
import { registerMessageTools } from './messageTools';
import { registerProcessTools } from './processTools';
import { registerReviewTools } from './reviewTools';
import { registerRuntimeTools } from './runtimeTools';
import { registerTaskTools } from './taskTools';
import { registerTeamTools } from './teamTools';
import { registerWorkSyncTools } from './workSyncTools';

const REGISTRATION_BY_GROUP = {
  team: registerTeamTools,
  task: registerTaskTools,
  lead: registerLeadTools,
  kanban: registerKanbanTools,
  review: registerReviewTools,
  message: registerMessageTools,
  process: registerProcessTools,
  runtime: registerRuntimeTools,
  workSync: registerWorkSyncTools,
  crossTeam: registerCrossTeamTools,
} as const;

export const ORDIS_MCP_REGISTRATION_GROUPS = ORDIS_MCP_TOOL_GROUPS.map((group) => ({
  ...group,
  register: REGISTRATION_BY_GROUP[group.id as keyof typeof REGISTRATION_BY_GROUP],
}));

export { ORDIS_REGISTERED_TOOL_NAMES };

export function registerTools(server: FastMCP) {
  for (const group of ORDIS_MCP_REGISTRATION_GROUPS) {
    group.register(server);
  }
}
