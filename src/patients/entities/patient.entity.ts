import { BaseEntity } from "src/common/BaseEntity";
import { Column, Entity } from "typeorm";

@Entity()
export class Patient extends BaseEntity{
    @Column({ type: 'varchar', nullable: true })
    userName: string;

    @Column({ type: 'int', nullable: true })
    age?: number;

    @Column({ type: 'varchar' })
    email: string;

    @Column({ type: 'varchar', nullable: true })
    fullName: string;

    @Column({ type: 'varchar', nullable: true })
    image?: string;

    @Column({ type: 'varchar', nullable: true })
    phoneNumber: string;


}
