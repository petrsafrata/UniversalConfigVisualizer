import type { Node } from "../types/graph";

type ServiceDetailPanelProps = {
  node: Node | null;
  dependents: string[];
  dependencies: string[];
};

function parseBuildInfo(rawBuild: string | undefined): { context: string; dockerfile: string; raw: string } {
  const raw = String(rawBuild ?? "");
  if (!raw) {
    return { context: "", dockerfile: "", raw: "" };
  }

  const contextMatch = raw.match(/context\s*=\s*([^,}\]]+)/i);
  const dockerfileMatch = raw.match(/dockerfile\s*=\s*([^,}\]]+)/i);

  return {
    context: contextMatch ? contextMatch[1].trim() : raw === "." ? "." : "",
    dockerfile: dockerfileMatch ? dockerfileMatch[1].trim() : "",
    raw
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function toStringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => (isRecord(item) ? JSON.stringify(item) : String(item)));
  }

  if (value === undefined || value === null) {
    return [];
  }

  return [isRecord(value) ? JSON.stringify(value) : String(value)];
}

function formatCompactValue(value: unknown): string {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join(", ");
  }

  if (isRecord(value)) {
    return JSON.stringify(value);
  }

  return String(value);
}

function formatObjectEntries(value: unknown): string[] {
  if (!isRecord(value)) {
    return toStringList(value);
  }

  return Object.entries(value).map(([key, raw]) => `${key}: ${formatCompactValue(raw)}`);
}

function formatNetworks(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item));
  }

  if (isRecord(value)) {
    return Object.keys(value);
  }

  return toStringList(value);
}

function renderList(label: string, values: string[]): JSX.Element | null {
  if (values.length === 0) {
    return null;
  }

  return (
    <div className="detail-row">
      <strong>{label}:</strong>
      <ul className="detail-value-list">
        {values.map((value, index) => (
          <li key={`${label}-${index}-${value}`}>{value}</li>
        ))}
      </ul>
    </div>
  );
}

export function ServiceDetailPanel({ node, dependents, dependencies }: ServiceDetailPanelProps): JSX.Element {
  if (!node) {
    return <div className="meta meta-empty">Click a node to view service details.</div>;
  }

  const metadata = node.metadata ?? {};
  const ports = Array.isArray(metadata.ports) ? metadata.ports : [];
  const dependsOn = Array.isArray(metadata.depends_on) ? metadata.depends_on : [];
  const buildInfo = parseBuildInfo(metadata.build);
  const environment = formatObjectEntries(metadata.environment);
  const volumes = toStringList(metadata.volumes);
  const healthcheck = formatObjectEntries(metadata.healthcheck);
  const restart = toStringList(metadata.restart);
  const networks = formatNetworks(metadata.networks);

  return (
    <div className="meta">
      <div className="detail-list">
        <div className="detail-title">Service: {node.id}</div>
        {metadata.image && (
          <div>
            <strong>Image:</strong> {metadata.image}
          </div>
        )}
        {(buildInfo.context || buildInfo.dockerfile || buildInfo.raw) && (
          <div>
            <strong>Build:</strong>{" "}
            {buildInfo.context ? `context=${buildInfo.context}` : ""}
            {buildInfo.context && buildInfo.dockerfile ? ", " : ""}
            {buildInfo.dockerfile ? `dockerfile=${buildInfo.dockerfile}` : !buildInfo.context ? buildInfo.raw : ""}
          </div>
        )}
        {renderList("Ports", ports)}
        {renderList("Depends on", dependsOn)}
        {renderList("Environment", environment)}
        {renderList("Volumes", volumes)}
        {renderList("Healthcheck", healthcheck)}
        {renderList("Restart", restart)}
        {renderList("Networks", networks)}
        {renderList("Dependents", dependents)}
        {renderList("Dependencies", dependencies)}
      </div>
    </div>
  );
}

