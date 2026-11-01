import type { ReactNode } from 'react';
import './labs.css';

interface Props {
  name: string;
  note: string;
  children: ReactNode;
  actions?: ReactNode;
}

/** Moldura comum dos laboratórios interativos de cada projeto. */
export function LabFrame({ name, note, children, actions }: Props) {
  return (
    <div className="lab">
      <div className="lab__bar">
        <span className="lab__name mono">
          <span className="lab__tag">lab</span> {name}
        </span>
        {actions}
      </div>
      <div className="lab__body">{children}</div>
      <p className="lab__note mono">{note}</p>
    </div>
  );
}
