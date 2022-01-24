import { NoteItem } from './noteItem.model';
import { User } from './user.model';

export interface State {
  readonly notes: Array<NoteItem>;
  filter_notes: Array<NoteItem>;
  readonly user: User;
}