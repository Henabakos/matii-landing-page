import React from "react";
import {
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiPython,
  SiFigma,
  SiPostgresql,
  SiDocker,
  SiGraphql,
  SiRedis,
  SiVuedotjs,
  SiVite,
  SiVercel,
  SiSupabase,
  SiStripe,
  SiGit,
  SiPostman,
  SiKubernetes,
  SiMongodb,
  SiGo,
  SiPrisma,
  SiRust,
  SiSvelte,
  SiFlutter,
  SiSwift,
  SiKotlin,
  SiGithub,
  SiLinear,
  SiFramer,
  SiCloudflare,
  SiTurborepo,
  SiJest,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { TbBrandGoogleAnalytics } from "react-icons/tb";

interface TechIconProps {
  name: string;
  className?: string;
  color?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({
  name,
  className = "w-8 h-8",
  color,
}) => {
  const iconKey = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  const iconProps = {
    className: `${className} text-[#292c2e]`,
    ...(color ? { color } : { color: "#292c2e" }),
  };

  switch (iconKey) {
    case "react":
    case "reactjs":
      return <SiReact {...iconProps} />;
    case "typescript":
    case "ts":
      return <SiTypescript {...iconProps} />;
    case "nextjs":
    case "next":
      return <SiNextdotjs {...iconProps} />;
    case "tailwindcss":
    case "tailwind":
    case "tw":
      return <SiTailwindcss {...iconProps} />;
    case "nodejs":
    case "node":
      return <SiNodedotjs {...iconProps} />;
    case "python":
      return <SiPython {...iconProps} />;
    case "figma":
      return <SiFigma {...iconProps} />;
    case "postgresql":
    case "postgres":
      return <SiPostgresql {...iconProps} />;
    case "gemini":
    case "google":
      return <TbBrandGoogleAnalytics {...iconProps} />;
    case "docker":
      return <SiDocker {...iconProps} />;
    case "aws":
      return <FaAws {...iconProps} />;
    case "graphql":
      return <SiGraphql {...iconProps} />;
    case "openai":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5355-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0805.0805 0 0 1-.0332.0615L9.74 19.434a4.504 4.504 0 0 1-6.1408-1.1302zM2.3423 9.7027a4.466 4.466 0 0 1 2.3409-1.9729V13.3a.7901.7901 0 0 0 .388.686l5.8428 3.3686-2.02 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7913A4.4944 4.4944 0 0 1 2.3423 9.7027zm16.5963 3.8558L13.0958 10.19l2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6776 8.1042v-5.5826a.7901.7901 0 0 0-.3927-.6813zm2.0107-3.0231l-.142-.0852-4.7735-2.7582a.7712.7712 0 0 0-.7806 0L9.4104 11.06V8.7277a.0805.0805 0 0 1 .0332-.0615l4.8303-2.7914a4.504 4.504 0 0 1 6.6763 4.1438zm-12.641-4.045a4.4755 4.4755 0 0 1 2.8764 1.0408l-.1419.0804-4.7783 2.7582a.7948.7948 0 0 0-.3927.6813v6.7369l-2.02-1.1686a.071.071 0 0 1-.038-.052V10.98a4.504 4.504 0 0 1 4.4945-4.4944zm.7061 5.3778l3.1891-1.8433 3.189 1.8433v3.6866l-3.189 1.8433-3.1891-1.8433z" />
        </svg>
      );
    case "redis":
      return <SiRedis {...iconProps} />;
    case "vue":
    case "vuejs":
      return <SiVuedotjs {...iconProps} />;
    case "vite":
      return <SiVite {...iconProps} />;
    case "vercel":
      return <SiVercel {...iconProps} />;
    case "supabase":
      return <SiSupabase {...iconProps} />;
    case "stripe":
      return <SiStripe {...iconProps} />;
    case "git":
      return <SiGit {...iconProps} />;
    case "postman":
      return <SiPostman {...iconProps} />;
    case "kubernetes":
    case "k8s":
      return <SiKubernetes {...iconProps} />;
    case "mongodb":
    case "mongo":
      return <SiMongodb {...iconProps} />;
    case "golang":
    case "go":
      return <SiGo {...iconProps} />;
    case "prisma":
      return <SiPrisma {...iconProps} />;
    case "rust":
      return <SiRust {...iconProps} />;
    case "svelte":
      return <SiSvelte {...iconProps} />;
    case "flutter":
      return <SiFlutter {...iconProps} />;
    case "swift":
      return <SiSwift {...iconProps} />;
    case "kotlin":
      return <SiKotlin {...iconProps} />;
    case "github":
      return <SiGithub {...iconProps} />;
    case "linear":
      return <SiLinear {...iconProps} />;
    case "framer":
      return <SiFramer {...iconProps} />;
    case "cloudflare":
      return <SiCloudflare {...iconProps} />;
    case "turborepo":
    case "turbo":
      return <SiTurborepo {...iconProps} />;
    case "jest":
      return <SiJest {...iconProps} />;
    default:
      return (
        <div
          className={`flex items-center justify-center font-bold text-xs rounded bg-zinc-200 text-zinc-700 ${className}`}
        >
          {name.slice(0, 2).toUpperCase()}
        </div>
      );
  }
};

export default TechIcon;
