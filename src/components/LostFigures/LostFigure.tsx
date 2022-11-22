import React, { FC } from 'react';
import { Figure } from '../../models/figures/Figure';

interface LostFiguresProps {
  title: string;
  figures: Figure[];
}

export const LostFigures: FC<LostFiguresProps> = ({ title, figures }) => {
  return (
    <div className="lost">
      <h3>{title}</h3>
      {figures.map((it) => (
        <div key={it.id}>
          {it.name} {it.logo && <img src={it.logo} width={20} height={20} />}
        </div>
      ))}
    </div>
  );
};
