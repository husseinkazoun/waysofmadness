// Video embeds for project pages
// Format: slug -> array of video embed objects

export type VideoEmbed = {
  type: "vimeo" | "youtube";
  id: string;
  title?: string;
};

export const pageVideos: Record<string, VideoEmbed[]> = {
  "southern-birds-project": [
    {
      type: "vimeo",
      id: "1074273260?h=d54b13fd41",
      title: "Southern Birds",
    },
  ],
  "jal-el-bahr": [
    // Add Jal El Bahr video here when available
  ],
  "snakes-and-ladders": [
    // Add Snakes and Ladders video here when available
  ],
  "unhearable-voices": [
    // Add Unhearable Voices video here when available
  ],
};
