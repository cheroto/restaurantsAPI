import { controller, httpGet } from "inversify-express-utils";

@controller('/')
export class HealthController {
    @httpGet('health')
    public checkHealth(): string {
        return 'All is well!';
    }
}
