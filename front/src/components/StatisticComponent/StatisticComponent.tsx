import { Container, Grid, Paper, Typography } from '@mui/material';
import ProjectManagementIcon from '@mui/icons-material/AssignmentTurnedIn';
import ContentManagementIcon from '@mui/icons-material/Work';
import UserIcon from '@mui/icons-material/EmojiPeople';
import AimIcon from '@mui/icons-material/Star';
import './StatisticComponent.css'; // Importa el archivo CSS
import { Tilt } from 'react-tilt';

const StatisticComponent = () => {
  return (
    <section className="stats">
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Tilt>
              <Paper className="statBox custom-stat-box">
                <ProjectManagementIcon className="statIcon" />
                <Typography variant="h5" className="statText">
                  <span className="counter" data-from={10} data-to={750} data-speed={3000} data-refresh-interval={50}>
                    750
                  </span>
                  <span className="sign">+</span>
                </Typography>
                <Typography variant="subtitle1" className="statText">
                  finished projects
                </Typography>
              </Paper>
            </Tilt>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Tilt>
              <Paper className="statBox custom-stat-box">
                <ContentManagementIcon className="statIcon" />
                <Typography variant="h5" className="statText">
                  <span className="counter" data-from={0} data-to={23} data-speed={3000} data-refresh-interval={50}>
                    23
                  </span>
                  <span className="sign">+</span>
                </Typography>
                <Typography variant="subtitle1" className="statText">
                  Created jobs
                </Typography>
              </Paper>
            </Tilt>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Tilt>
              <Paper className="statBox custom-stat-box">
                <UserIcon className="statIcon" />
                <Typography variant="h5" className="statText">
                  <span className="counter" data-from={0} data-to={200} data-speed={3000} data-refresh-interval={50}>
                    200
                  </span>
                  <span className="sign">+</span>
                </Typography>
                <Typography variant="subtitle1" className="statText">
                  happy customers
                </Typography>
              </Paper>
            </Tilt>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Tilt>
              <Paper className="statBox custom-stat-box">
                <AimIcon className="statIcon" />
                <Typography variant="h5" className="statText">
                  <span className="counter" data-from={0} data-to={28} data-speed={3000} data-refresh-interval={50}>
                    28
                  </span>
                  <span className="sign">+</span>
                </Typography>
                <Typography variant="subtitle1" className="statText">
                  years Of experience
                </Typography>
              </Paper>
            </Tilt>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default StatisticComponent;
