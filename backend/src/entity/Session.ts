import {
    Entity,
    Column,
    JoinColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
} from "typeorm";
import { Link } from "./Links";

@Entity()
export class Session {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(type => Link)
    @JoinColumn()
    link: Link;
    @Column()
    ip: string;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    timestamp: Date;
    @Column()
    country: string;
}
