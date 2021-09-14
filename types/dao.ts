import { Token } from 'components/cards/member-card';
import { PolicyType } from './proposal';

export type DaoVotePolicy = {
  weightKind: string;
  quorum: string;
  kind: string;
  ratio: number[];
};

export type TGroup = {
  members: string[];
  name: string;
  permissions: string[];
  votePolicy: DaoVotePolicy;
  slug: string;
};

export type Member = {
  id: string;
  name: string;
  groups: string[];
  tokens: Token;
  votes: number;
} & { [key: string]: string | string[] | Token | number };

export type DAO = {
  id: string;
  name: string;
  description: string;
  members: number;
  funds: string;
  proposals: number;
  createdAt: string;
  logo: string;
  groups: TGroup[];
  policy: PolicyType;
  link?: string | null;
};
