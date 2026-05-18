"use server"

export const checkAdmin = async (password:string)=> {
    const result = {
        passed:password == process.env.ADMIN_PASS
    }
    return result.passed
}