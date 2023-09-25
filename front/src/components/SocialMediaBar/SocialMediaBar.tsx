import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // Agregado el ícono de WhatsApp
import './SocialMediaBar.css'

const SocialMediaBar = () => {
  return (
    <div className={`SocialMediaBar`}>
      <IconButton  aria-label="Gmail" >
        <EmailIcon />
      </IconButton>
      <IconButton  aria-label="Facebook">
        <FacebookIcon />
      </IconButton>
      <IconButton  aria-label="Instagram">
        <InstagramIcon />
      </IconButton>
      <IconButton  aria-label="Twitter">
        <TwitterIcon />
      </IconButton>
      <IconButton  aria-label="WhatsApp"> {/* Agregado el ícono de WhatsApp */}
        <WhatsAppIcon />
      </IconButton>
    </div>
  );
};

export default SocialMediaBar;
