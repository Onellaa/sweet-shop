import "../css/footer.css";
import cube1 from "../assets/f1 (1).png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
function Footer() {
  return (
    <div className="footer">
    <img src={cube1} className="f1"/>
      <div className="socialmedia">
      <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} size="2x" />
          Facebook
        </a>
        <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
          Twitter
        </a>
        <a href="https://www.instagram.com/onella.dd" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} size="2x" />
          Instagram
        </a>
        <a href="https://www.linkedin.com/in/onella-dias-003-od/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} size="2x" />
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default Footer;
