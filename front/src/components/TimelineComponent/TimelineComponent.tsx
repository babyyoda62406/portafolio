
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { FC } from 'react';
import { TimeLineItem, TimelineProps } from '../../types/typesComponents';
import CardProyect from '../CardProject/CardProject';
import './TimelineComponent.css'

const TimeLineComponet: FC<TimelineProps> = ({ items }) => {
  return <div className='TimeLineComponent'>
    <Timeline position="alternate">
      {
        items.map((item: TimeLineItem) => {
          const {date , description, iconSrc, languageIcons, title} = item
          return <TimelineItem>
            <TimelineOppositeContent
              sx={{ m: 'auto 0' }}
              align="right"
              variant="body2"
              color="text.white"
            >
              {date}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineConnector />
              <TimelineDot>
                <FastfoodIcon />
              </TimelineDot>
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '12px', px: 2 }}>
                <CardProyect title={title} src={iconSrc} description={description}   />
            </TimelineContent>
          </TimelineItem>
        })
      }
    </Timeline>
  </div>
}

export default TimeLineComponet