import { Box, Container, Typography } from '@mui/material'
import type { NextPage } from 'next'
import Copyright from '../components/Copyright'
import Link from '../components/Link'
import ProTip from '../components/ProTip'

const Home: NextPage = () => {
  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant='h4' component='h1' gutterBottom>
          MUI v5 + Next.js with TypeScript example
        </Typography>
        <Link href='/about' color='secondary'>
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  )
}

export default Home

/*
// src/pages/user/[uuid].tsx
import { withRelay, RelayProps } from 'relay-nextjs';
import { graphql, usePreloadedQuery } from 'react-relay/hooks';

// The $uuid variable is injected automatically from the route.
const ProfileQuery = graphql`
  query profile_ProfileQuery($uuid: ID!) {
    user(id: $uuid) {
      id
      firstName
      lastName
    }
  }
`;

function UserProfile({ preloadedQuery }: RelayProps<{}, profile_ProfileQuery>) {
  const query = usePreloadedQuery(ProfileQuery, preloadedQuery);

  return (
    <div>
      Hello {query.user.firstName} {query.user.lastName}
    </div>
  );
}

function Loading() {
  return <div>Loading...</div>;
}

export default withRelay(UserProfile, UserProfileQuery, {
  // Fallback to render while the page is loading.
  // This property is optional.
  fallback: <Loading />,
  // Create a Relay environment on the client-side.
  // Note: This function must always return the same value.
  createClientEnvironment: () => getClientEnvironment()!,
  // Gets server side props for the page.
  serverSideProps: async (ctx) => {
    // This is an example of getting an auth token from the request context.
    // If you don't need to authenticate users this can be removed and return an
    // empty object instead.
    const { getTokenFromCtx } = await import('lib/server/auth');
    const token = await getTokenFromCtx(ctx);
    if (token == null) {
      return {
        redirect: { destination: '/login', permanent: false },
      };
    }

    return { token };
  },
  // Server-side props can be accessed as the second argument
  // to this function.
  createServerEnvironment: async (
    ctx,
    // The object returned from serverSideProps. If you don't need a token
    // you can remove this argument.
    { token }: { token: string }
  ) => {
    const { createServerEnvironment } = await import('lib/server_environment');
    return createServerEnvironment(token);
  },
});
*/
