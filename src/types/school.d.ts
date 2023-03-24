export type Week = Day[]

export type Day = Hour[]

export type Hour = {
    teacher: TeacherID | undefined
    subject: SubjectID | undefined
}

export type TeacherID = number

export type SubjectID = number

export type Teacher = {

    id: number
    name: String
    color: Color
}

export type Teachers = Teacher[]

export type Subject = {
    id: number
    name: String
}

export type Subjects = Subject[]

export type  Color = {
    r: number;
    g: number;
    b: number;
}