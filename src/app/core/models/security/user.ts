interface User extends Model {
    username: string;
    password: string;
    email: string;
    fullName: string;
    birthdate: Date;
    course: Course;
    roles: Role[];
}