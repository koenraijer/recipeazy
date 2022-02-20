import supabase from './db'

export async function signOut() {
    const { error } = await supabase.auth.signOut()
}

export async function createPost({title, introduction, ingredients, instructions, user}) {
    const {data, error} = await supabase
        .from('recipes')
        .insert({title, introduction, ingredients, instructions, user})
    
    if (error) throw new Error(error.message)

    ingredients = []
    instructions = []

    return {data, error}
}

export function addIngredient() {
    ingredients.push(ingredient);
    ingredient = '';
    ingredients = ingredients
}

export function addInstruction() {
    instructions.push(instruction);
    instruction = '';
    instructions = instructions;
}

export async function changeEmail() {
    const {user, error} = await supabase.auth.update({email: newEmail})
    if (error) throw new Error(error.message)
    return {data, error}
}

export async function changePassword() {
    const {user, error} = await supabase.auth.update({password: newPassword})
    if (error) throw new Error(error.message)
    return {data, error}
}