import { Post } from 'src/posts/post.entity';
import { Profile } from 'src/profiles/profile.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ nullable: true })
  authStrategy: string;

  @OneToOne(() => Profile) // relacion OneToOne con Profile
  @JoinColumn() // JoinColumn indica que esta entidad es la dueña de la relación
  profile: Profile; // relacion uno a uno con Profile

  @OneToMany(() => Post, (post) => post.author) // relacion OneToMany con Post
  posts: Post[]; // relacion uno a muchos con Post
}
