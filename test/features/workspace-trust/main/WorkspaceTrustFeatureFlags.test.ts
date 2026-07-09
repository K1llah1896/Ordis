import { describe, expect, it, vi } from 'vitest';

import { resolveWorkspaceTrustFeatureFlags } from '@features/workspace-trust/main';

describe('WorkspaceTrustFeatureFlags', () => {
  it('keeps workspace trust on by default without claiming file-lock support', () => {
    expect(resolveWorkspaceTrustFeatureFlags({} as NodeJS.ProcessEnv)).toEqual({
      enabled: true,
      claudePty: true,
      codexArgs: true,
      retry: false,
      fileLock: false,
    });
  });

  it('does not enable the reserved file lock flag through env yet', () => {
    expect(
      resolveWorkspaceTrustFeatureFlags({
        ORDIS_WORKSPACE_TRUST_FILE_LOCK: 'true',
      } as NodeJS.ProcessEnv).fileLock
    ).toBe(false);
  });

  it('uses the plan-name preflight flag before the legacy feature flag', () => {
    expect(
      resolveWorkspaceTrustFeatureFlags({
        ORDIS_WORKSPACE_TRUST_PREFLIGHT: 'false',
        ORDIS_WORKSPACE_TRUST: 'true',
      } as NodeJS.ProcessEnv)
    ).toMatchObject({
      enabled: false,
      claudePty: false,
      codexArgs: false,
    });
  });

  it('uses the plan-name Codex settings flag before the legacy args alias', () => {
    expect(
      resolveWorkspaceTrustFeatureFlags({
        ORDIS_WORKSPACE_TRUST_CODEX_SETTINGS: 'false',
        ORDIS_WORKSPACE_TRUST_CODEX_ARGS: 'true',
      } as NodeJS.ProcessEnv).codexArgs
    ).toBe(false);
  });

  it('keeps malformed default-on flags enabled and malformed default-off retry disabled', () => {
    expect(
      resolveWorkspaceTrustFeatureFlags({
        ORDIS_WORKSPACE_TRUST_PREFLIGHT: 'wat',
        ORDIS_WORKSPACE_TRUST_CLAUDE_PTY: 'maybe',
        ORDIS_WORKSPACE_TRUST_CODEX_SETTINGS: '???',
        ORDIS_WORKSPACE_TRUST_RETRY: 'later',
      } as NodeJS.ProcessEnv)
    ).toEqual({
      enabled: true,
      claudePty: true,
      codexArgs: true,
      retry: false,
      fileLock: false,
    });
    expect(vi.mocked(console.warn).mock.calls.map((call) => call.join(' '))).toEqual(
      expect.arrayContaining([
        expect.stringContaining('ORDIS_WORKSPACE_TRUST_PREFLIGHT'),
        expect.stringContaining('ORDIS_WORKSPACE_TRUST_CLAUDE_PTY'),
        expect.stringContaining('ORDIS_WORKSPACE_TRUST_CODEX_SETTINGS'),
        expect.stringContaining('ORDIS_WORKSPACE_TRUST_RETRY'),
      ])
    );
    vi.mocked(console.warn).mockClear();
  });

  it('keeps child capabilities off when the main preflight flag is disabled', () => {
    expect(
      resolveWorkspaceTrustFeatureFlags({
        ORDIS_WORKSPACE_TRUST_PREFLIGHT: 'off',
        ORDIS_WORKSPACE_TRUST_CLAUDE_PTY: 'on',
        ORDIS_WORKSPACE_TRUST_CODEX_SETTINGS: 'on',
        ORDIS_WORKSPACE_TRUST_RETRY: 'on',
      } as NodeJS.ProcessEnv)
    ).toEqual({
      enabled: false,
      claudePty: false,
      codexArgs: false,
      retry: false,
      fileLock: false,
    });
  });
});
