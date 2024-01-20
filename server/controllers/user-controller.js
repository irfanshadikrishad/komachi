import chalk from "chalk";
import User from "../models/user.js";

const updateList = async (req, res) => {
  try {
    const { animeId, status } = await req.body;

    const user = await User.findByIdAndUpdate(req.user._id);
    switch (status) {
      case "dropped": {
        const isExistsAlready = await user.dropped.includes(animeId);
        if (!isExistsAlready) {
          const onhold = await user.onhold.includes(animeId);
          const watching = await user.watching.includes(animeId);
          const watched = await user.watched.includes(animeId);
          const planning = await user.planning.includes(animeId);
          if (onhold) {
            const d2index = await user.onhold.indexOf(animeId);
            await user.onhold.splice(d2index, 1);
          }
          if (watching) {
            const d2index = await user.watching.indexOf(animeId);
            await user.watching.splice(d2index, 1);
          }
          if (watched) {
            const d2index = await user.watched.indexOf(animeId);
            await user.watched.splice(d2index, 1);
          }
          if (planning) {
            const d2index = await user.planning.indexOf(animeId);
            await user.planning.splice(d2index, 1);
          }
          await user.dropped.push(animeId);
          await user.save();
        }
        break;
      }
      case "onhold": {
        const isExistsAlready = await user.onhold.includes(animeId);
        if (!isExistsAlready) {
          const dropped = await user.dropped.includes(animeId);
          const watching = await user.watching.includes(animeId);
          const watched = await user.watched.includes(animeId);
          const planning = await user.planning.includes(animeId);
          if (dropped) {
            const d2index = await user.dropped.indexOf(animeId);
            await user.dropped.splice(d2index, 1);
          }
          if (watching) {
            const d2index = await user.watching.indexOf(animeId);
            await user.watching.splice(d2index, 1);
          }
          if (watched) {
            const d2index = await user.watched.indexOf(animeId);
            await user.watched.splice(d2index, 1);
          }
          if (planning) {
            const d2index = await user.planning.indexOf(animeId);
            await user.planning.splice(d2index, 1);
          }
          await user.onhold.push(animeId);
          await user.save();
        }
        break;
      }
      case "planning": {
        const isExistsAlready = await user.planning.includes(animeId);
        if (!isExistsAlready) {
          const onhold = await user.onhold.includes(animeId);
          const watching = await user.watching.includes(animeId);
          const watched = await user.watched.includes(animeId);
          const dropped = await user.dropped.includes(animeId);
          if (onhold) {
            const d2index = await user.onhold.indexOf(animeId);
            await user.onhold.splice(d2index, 1);
          }
          if (watching) {
            const d2index = await user.watching.indexOf(animeId);
            await user.watching.splice(d2index, 1);
          }
          if (watched) {
            const d2index = await user.watched.indexOf(animeId);
            await user.watched.splice(d2index, 1);
          }
          if (dropped) {
            const d2index = await user.dropped.indexOf(animeId);
            await user.dropped.splice(d2index, 1);
          }
          await user.planning.push(animeId);
          await user.save();
        }
        break;
      }
      case "watching": {
        const isExistsAlready = await user.watching.includes(animeId);
        if (!isExistsAlready) {
          const onhold = await user.onhold.includes(animeId);
          const planning = await user.planning.includes(animeId);
          const watched = await user.watched.includes(animeId);
          const dropped = await user.dropped.includes(animeId);
          if (onhold) {
            const d2index = await user.onhold.indexOf(animeId);
            await user.onhold.splice(d2index, 1);
          }
          if (planning) {
            const d2index = await user.planning.indexOf(animeId);
            await user.planning.splice(d2index, 1);
          }
          if (watched) {
            const d2index = await user.watched.indexOf(animeId);
            await user.watched.splice(d2index, 1);
          }
          if (dropped) {
            const d2index = await user.dropped.indexOf(animeId);
            await user.dropped.splice(d2index, 1);
          }
          await user.watching.push(animeId);
          await user.save();
        }
        break;
      }
      case "watched": {
        const isExistsAlready = await user.watched.includes(animeId);
        if (!isExistsAlready) {
          const onhold = await user.onhold.includes(animeId);
          const planning = await user.planning.includes(animeId);
          const watching = await user.watching.includes(animeId);
          const dropped = await user.dropped.includes(animeId);
          if (onhold) {
            const d2index = await user.onhold.indexOf(animeId);
            await user.onhold.splice(d2index, 1);
          }
          if (planning) {
            const d2index = await user.planning.indexOf(animeId);
            await user.planning.splice(d2index, 1);
          }
          if (watching) {
            const d2index = await user.watching.indexOf(animeId);
            await user.watching.splice(d2index, 1);
          }
          if (dropped) {
            const d2index = await user.dropped.indexOf(animeId);
            await user.dropped.splice(d2index, 1);
          }
          await user.watched.push(animeId);
          await user.save();
        }
        break;
      }
      case "none": {
        const onhold = await user.onhold.includes(animeId);
        const planning = await user.planning.includes(animeId);
        const watching = await user.watching.includes(animeId);
        const dropped = await user.dropped.includes(animeId);
        const watched = await user.watched.includes(animeId);

        if (onhold) {
          const d2index = await user.onhold.indexOf(animeId);
          await user.onhold.splice(d2index, 1);
        }
        if (planning) {
          const d2index = await user.planning.indexOf(animeId);
          await user.planning.splice(d2index, 1);
        }
        if (watching) {
          const d2index = await user.watching.indexOf(animeId);
          await user.watching.splice(d2index, 1);
        }
        if (dropped) {
          const d2index = await user.dropped.indexOf(animeId);
          await user.dropped.splice(d2index, 1);
        }
        if (watched) {
          const d2index = await user.watched.indexOf(animeId);
          await user.watched.splice(d2index, 1);
        }
        await user.save();
        break;
      }
    }
  } catch (error) {
    console.log(chalk.magenta(`[updateList] ${error.message}`));
  }
};

export { updateList };
