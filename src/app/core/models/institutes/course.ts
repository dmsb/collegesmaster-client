interface Course extends Model {
    name: string;
    institute: Institute
    disciplines: Discipline[];
}