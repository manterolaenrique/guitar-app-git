interface StatusBadgeProps {
  children: React.ReactNode;
  tone?: 'ready' | 'soon' | 'method';
}

export function StatusBadge({ children, tone = 'ready' }: StatusBadgeProps) {
  return <span className={`platform-status-badge ${tone}`}>{children}</span>;
}
