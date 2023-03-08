/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'
const nextConfig = {
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH,
  /* assetPrefix: isProd ? '/your-github-repo-name/' : '', */
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.tls = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.child_process = false;
    }

    return config;
  },
  publicRuntimeConfig: {
    SECRET_PASSWORD:'T4b9B8$*FgFX3D4lS!I6',
    PRIVATE_KEY:"-----BEGIN RSA PRIVATE KEY-----\nMIIBOQIBAAJBAMqRF3QcOwcdkvo6XekQeJdXECLZV6nXxNrbbKSUa5qmglX+NmGC\nz37AnL+KQpGVlvSh6vQoUy/rrkMPWYi3LIMCAwEAAQJAMj7LEoHuIlWzn13a7XSo\ndOGjnwFKPVbH/YFv8WLfTfyOVnooSzbQHDf1ysS4iOHuFd0t4OIP5ESRDAP0bjvA\nAQIhAOldO8VKmmVV10HIuwPVuAtW6QkI1Yp+XD0qlp+F83rDAiEA3jcdK3YqgQqM\nWOfHIUqRFtT6VdryRI/6cdejDN+860ECIGpQmGdkenyKI/wLV/ACUMuRt67vAGIM\n+TbAjUh1vRwDAiALKYGRmVHxQXJjVOEvzusS1ofsoB7jSsgtx8Ms9mArAQIgIwfa\nmoH41gJRvPL2iuOGqEYAc+lZMguuoLg4eAj90Lk=\n-----END RSA PRIVATE KEY-----\n"
  },
}

module.exports = nextConfig
