import PostForm from '../../components/PostForm'


function NewPost() {
    return <PostForm
                titleToDisplay='Nouvelle publication'
                buttonName='publier'
                navigateTo='../../gallery'
             />
}

export default NewPost
