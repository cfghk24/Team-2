import { verifyToken } from "../../controllers/common";
import { CookieOptions, NextFunction, Router } from "express";
import { Request, Response } from "express";
import { multerUpload } from "../../controllers/userManagement/tools";
import { generateKeyWords } from "../../controllers/operations/AI";
const router = Router();

router.get("/test", multerUpload.any(), async (req: any, res: Response, next: NextFunction) => {
  let keywords = await generateKeyWords("Mark had always been a dog person, but nothing could have prepared him for the whirlwind of joy and challenges that came with adopting Max, a spirited Golden Retriever puppy. From the moment Max bounded into his life, Mark's world turned upside down in the best possible way. Sleepless nights were spent comforting a whimpering puppy, and his shoes became Max's favorite chew toys. Yet, the unconditional love and loyalty Max showed made it all worthwhile. Through obedience classes, park adventures, and countless games of fetch, Mark watched Max grow from a mischievous pup into a loyal companion. The experience taught Mark patience, responsibility, and the profound bond that can form between humans and their furry friends. Now, five years later, Mark couldn't imagine life without Max by his side, grateful for the love and laughter his four-legged friend brings to each day.");

  res.send(keywords);
});

export default router;
