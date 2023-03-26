export type School = SchoolClass[]

export type SchoolClass = {
    name: string
    defaultTeacher: TeacherID
    week: Week
}

export type Week = Day[]

export type Day = (Hour | null)[]

export type Hour = {
    teacher: TeacherID
    subject: SubjectID | null
}

export type TeacherID = number

export type SubjectID = number

export type Teacher = {

    id: number
    name: String
    color: string
}

export type Teachers = Teacher[]

export type Subject = {
    id: number
    name: String
}

export type Subjects = Subject[]

export type Data = {
    school: School,
    teachers: Teachers,
    subjects: Subjects
}