import axios from "axios";

const isLeftFoot = async ({
  url = "https://vykingsneakerkitnative.s3.amazonaws.com/SneakerStudio/may_android_ios/air_jordan_1_turbo_green/offsets.json",
}: {
  url?: string;
}) => {
  const response = await axios.get<{ right_foot: boolean; left_foot: boolean }>(
    url
  );

  return response.data.left_foot;
};

export { isLeftFoot };
