/** @type {import('next').NextConfig} */
/*const nextConfig = {};

export default nextConfig;
*/

import withPWA from "next-pwa";

export default withPWA({
    dest: "public",
    register: true,
    skipWaiting: true,
});