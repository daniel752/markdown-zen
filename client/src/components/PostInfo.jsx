import Wrapper from "../assets/wrappers/PostInfo";

const PostInfo = ({ icon, text }) =>
{
    return (
        <Wrapper>
            <span className="post-icon">{icon}</span>
            <span className="post-text">{text}</span>
        </Wrapper>
    )
}
export default PostInfo;