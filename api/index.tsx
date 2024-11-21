import { Button, Frog } from 'frog';
import { devtools } from 'frog/dev';
import { pinata } from 'frog/hubs';
import { neynar } from 'frog/middlewares';
import { serveStatic } from 'frog/serve-static';
import { handle } from 'frog/vercel';

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// };

export const app = new Frog({
  basePath: '/api',
  // Supply a Hub API URL to enable frame verification.
  hub: pinata(),
}).use(
  neynar({
    apiKey: 'NEYNAR_FROG_FM',
    features: ['interactor', 'cast'],
  })
);

app.frame('/', (c) => {
  const { status, frameData } = c;

  console.log('frameData:', frameData);

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          backgroundColor: '#000000', // Latar belakang hitam
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
          padding: '20px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Latar belakang semi-transparan untuk teks
            borderRadius: '10px',
            color: '#FFFFFF', // Teks putih
            fontSize: 48,
            padding: '20px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response' ? `Claim $SOCIAL` : ' $SOCIAL '}
        </div>
      </div>
    ),
    intents: [
      // Tombol Claim $SOCIAL langsung mengarah ke halaman compose
      <Button.Link
        href="https://warpcast.com/~/compose?text=Claiming my @socialtoken airdrop and crediting @aliselalujp with my social airdrop for being a good friend%20&embeds[]=https://social-claimer-frame.vercel.app/api"
      >
        🎁Claim $SOCIAL
      </Button.Link>,
    ],
  });
});

// Fungsi tambahan dihapus karena tidak lagi relevan
devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);
