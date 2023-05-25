import { Link, Navigate, useNavigate } from 'react-router-dom';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  LinearProgress,
  Typography
} from '@mui/material';

// project imports
import AnimateButton from 'components/AnimateButton';
import { gridSpacing } from 'store/constant';

// assets
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import ReplayIcon from '@mui/icons-material/Replay';

import image from 'assets/images/maintenance/img-build.svg';
import imageBackground from 'assets/images/maintenance/img-bg-grid.svg';
import imageDarkBackground from 'assets/images/maintenance/img-bg-grid-dark.svg';
import imageParts from 'assets/images/maintenance/img-bg-parts.svg';
import { useEffect, useLayoutEffect, useState } from 'react';
import APIManager from 'utils/APImanager';
import useScriptRef from 'hooks/useScriptRef';

// styles
const CardMediaWrapper = styled('div')({
  maxWidth: 720,
  margin: '0 auto',
  position: 'relative'
});

const PageContentWrapper = styled('div')({
  maxWidth: 350,
  margin: '0 auto',
  textAlign: 'center'
});

const ConstructionCard = styled(Card)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const CardMediaBuild = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '5s bounce ease-in-out infinite'
});

const CardMediaParts = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '10s blink ease-in-out infinite'
});

const UnderConstruction = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(async () => {
    try {
      const res = await fetch(process.env.REACT_APP_BASE_URL);

      if (res.status === 200) {
        navigate('/');
      }
    } catch (err) {
      setChecking(false);
    }
  }, []);

  if (checking) {
    return <LinearProgress color="secondary" />;
  }

  return (
    <ConstructionCard>
      <CardContent>
        <Grid container justifyContent="center" spacing={gridSpacing}>
          <Grid item xs={12}>
            <CardMediaWrapper>
              <CardMedia
                component="img"
                image={theme.palette.mode === 'dark' ? imageDarkBackground : imageBackground}
              />
              <CardMediaParts src={imageParts} />
              <CardMediaBuild src={image} />
            </CardMediaWrapper>
          </Grid>
          <Grid item xs={12}>
            <PageContentWrapper>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  <Typography variant="h1" component="div">
                    We'll be back soon!
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    We're very sorry for the inconvenience but we're performing maintenance.Please
                    check back soon...
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <AnimateButton>
                    <Button variant="contained" size="large" component={Link} to="/">
                      <ReplayIcon sx={{ fontSize: '1.3rem', mr: 0.75 }} />
                      RETRY
                    </Button>
                  </AnimateButton>
                </Grid>
              </Grid>
            </PageContentWrapper>
          </Grid>
        </Grid>
      </CardContent>
    </ConstructionCard>
  );
};

export default UnderConstruction;
