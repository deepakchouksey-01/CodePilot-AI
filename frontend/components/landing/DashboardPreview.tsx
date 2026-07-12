import {
  ShieldCheck,
  Bug,
  Zap,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

export default function DashboardPreview() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">

        <div className="text-center">
          <h2 className="text-4xl font-bold">
            AI Review Dashboard
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Monitor your repositories, security, bugs and code quality
            from one intelligent dashboard.
          </p>
        </div>

        <div className="mt-16 rounded-3xl border bg-gray-50 p-8 shadow-xl">

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-2xl bg-white p-6 shadow">
              <BarChart3 className="mb-4" size={32} />
              <h3 className="text-3xl font-bold">92%</h3>
              <p className="text-gray-600">
                Code Quality Score
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
              <ShieldCheck className="mb-4 text-green-600" size={32} />
              <h3 className="text-3xl font-bold">Secure</h3>
              <p className="text-gray-600">
                No Critical Issues
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
              <Bug className="mb-4 text-red-600" size={32} />
              <h3 className="text-3xl font-bold">12</h3>
              <p className="text-gray-600">
                Bugs Detected
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow">
              <Zap className="mb-4 text-yellow-500" size={32} />
              <h3 className="text-3xl font-bold">Fast</h3>
              <p className="text-gray-600">
                Performance Optimized
              </p>
            </div>

          </div>

          <div className="mt-10 rounded-2xl bg-white p-8 shadow">

            <h3 className="mb-6 text-2xl font-bold">
              Recent AI Reviews
            </h3>

            <div className="space-y-4">

              {[
                "Authentication Service",
                "Payment API",
                "Dashboard UI",
                "Profile Module",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between rounded-xl border p-4"
                >
                  <div>

                    <h4 className="font-semibold">
                      {item}
                    </h4>

                    <p className="text-sm text-gray-500">
                      Reviewed successfully
                    </p>

                  </div>

                  <CheckCircle2
                    className="text-green-600"
                    size={26}
                  />

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}