import InfoLine from "@/components/info-line";
import db from "@/db/db";
import { FREE_TRIAL_END, LOGIN_PAGE_URL } from "@/lib/constants";
import { capitalize, isFreeTrialActive } from "@/lib/utils";
import { Subscription, User } from "@prisma/client";
import { redirect } from "next/navigation";
import LogoutButton from "./_components/logout-button";
import PreDeleteButton from "./_components/pre-delete-button";
import { getSession } from "@/lib/auth";

function formatSubscriptionType(user: User, subscription: Subscription | null) {
  if (subscription && subscription.expiresAt.getTime() > Date.now())
    return capitalize(subscription.type);
  return isFreeTrialActive(user) ? "Free Trial" : "None";
}

function formatSubscriptionExpires(
  user: User,
  subscription: Subscription | null
) {
  if (subscription && subscription.expiresAt.getTime() > Date.now())
    return subscription.expiresAt.toLocaleDateString();
  if (user.freeTrialStart === null) return "N/A";
  return FREE_TRIAL_END.toLocaleDateString();
}

export default async function AccountPage() {
  const session = await getSession();
  if (!session?.id) redirect(LOGIN_PAGE_URL);
  const [user, subscription] = await Promise.all([
    db.user.findUnique({ where: { id: session.id } }),
    db.subscription.findUnique({ where: { userId: session.id } }),
  ]);

  if (!user) redirect(LOGIN_PAGE_URL);

  return (
    <main className="place-items-center grid h-page">
      <div className="flex flex-col items-center gap-4 w-2/3">
        <h1 className="font-bold text-2xl">Your Account</h1>
        <div className="space-y-6 w-full">
          <InfoLine label="Email" value={user.email} />
          <InfoLine
            label="Subscription"
            value={formatSubscriptionType(user, subscription)}
          />
          <InfoLine
            label="Subscription Expires"
            value={formatSubscriptionExpires(user, subscription)}
          />
          <InfoLine
            label="Subscription Renews"
            value={
              subscription?.isActive === undefined
                ? "N/A"
                : subscription.isActive
                  ? "Yes"
                  : "No"
            }
          />
          <div className="flex gap-4 w-full">
            <LogoutButton />
            <PreDeleteButton />
          </div>
        </div>
      </div>
    </main>
  );
}
