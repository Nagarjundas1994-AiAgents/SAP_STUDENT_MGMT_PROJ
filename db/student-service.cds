using {my.school as db} from '../srv/schema';

service StudentService{
    entity Students as projection on db.Students;
    entity Courses as projection on db.Courses;

}