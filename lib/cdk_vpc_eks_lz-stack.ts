import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

export class CdkVpcEksLzStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    const vpcCidr = '10.0.0.0/16';
    const vpc = new ec2.Vpc(this, 'VpcEksLandingZone', {
      cidr: vpcCidr,
   });

   const securityGroup = new ec2.SecurityGroup(this, 'VPCEndpointSecurityGroup', {
     vpc: vpc,
     allowAllOutbound: true,
     description: 'allow endpoints to communicate with services'
   });

   securityGroup.addIngressRule(
     ec2.Peer.ipv4(vpcCidr),
     ec2.Port.allTcp(),
     'allow all local traffic'
   );

   vpc.addInterfaceEndpoint('ECREndpoint', {
      service: ec2.InterfaceVpcEndpointAwsService.ECR,
      securityGroups: [ securityGroup ]
    });

    vpc.addInterfaceEndpoint('ECRDockerEndpoint', {
      service: ec2.InterfaceVpcEndpointAwsService.ECR_DOCKER,
      securityGroups: [ securityGroup ]
    });

    vpc.addInterfaceEndpoint('CloudwatchEndpoint', {
      service: ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH,
      securityGroups: [ securityGroup ]
    });

    vpc.addInterfaceEndpoint('CloudwatchEventsEndpoint', {
      service: ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_EVENTS,
      securityGroups: [ securityGroup ]
    });
  }
}
