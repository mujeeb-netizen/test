
export const getUser=(data)=>{
    return {
        type:'GET_USER',
    }
}
export const editUid=(data)=>(
    {
        type: 'EDIT_UID',
        uid: data.uid
    }
)
export const editUser=(data)=>{
    return {
        type:'EDIT_USER',
        uid:data.uid,
        isrc: data.isrc,
        docid: data.docid,
        gpa: data.gpa,
        email: data.email,
        role: data.role,
        address: data.address,
        ahi: data.ahi,
        city: data.city,
        eth: data.eth,
        gender: data.gender,
        state: data.state,
        zip: data.zip,
        phone: data.phone,
        cun: data.cun,
        cu: data.cu,
        country: data.country,
        fname: data.fname,
        lname: data.lname,
        pos: data.pos
    }
}
export const editISRC=(data)=>(
    {
        type: 'EDIT_ISRC',
        isrc: data.isrc
    }
)
export const editROLE = (data) => (
    {
        type: 'EDIT_ROLE',
        role: data.role
    }
)
export const editDOCID = (data) => (
    {
        type: 'EDIT_DOCID',
        docid: data.docid
    }
)
export const editGPA = (data) => (
    {
        type: 'EDIT_GPA',
        gpa: data.gpa
    }
)
export const editEMAIL = (data) => (
    {
        type: 'EDIT_EMAIL',
        email: data.email
    }
)
export const deleteUser=()=>(
    {
        type:'DELETE_USER',
    }
)
export const deleteLibView = () => (
    {
        type:'DELETE_LIBVIEW',
    }
)