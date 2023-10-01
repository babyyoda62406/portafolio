import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './CardProject.css'

import { FC } from 'react'

import { TpCardProyect } from '../../types/typesComponents';
import LanguagesFC from '../LanguagesFC/LanguagesFC';


const CardProyect: FC<TpCardProyect> = ({ title, src, description }) => {

  return (
    <Card sx={{ maxWidth: 500 }} className='CardPryect'>
      <CardHeader
        avatar={
          <div className='ctAvatar'>
            <img className="imgAvatar" src={src} alt="R" />
          </div>
        }
        action={
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
          </CardActions>
        }
        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image="/static/images/cards/paella.jpg"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <LanguagesFC />
    </Card>
  );
}


export default CardProyect