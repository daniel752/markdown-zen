const Logo = ({ src = '/logo_black.png' }) => {
  return (
    <img src={src} alt="MarkdownZen logo" className="logo" id="logo"></img>
  );
};
export default Logo;
