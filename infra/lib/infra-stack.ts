import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront';
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 1. S3 Bucket for the Frontend
    const websiteBucket = new s3.Bucket(this, 'PortfolioWebsiteBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    // 2. CloudFront Distribution
    const distribution = new cloudfront.Distribution(this, 'PortfolioDistribution', {
      defaultBehavior: {
        origin: new origins.S3Origin(websiteBucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
      },
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        },
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
        }
      ],
    });

    // 3. Lambda Function for Contact Form
    const mailerLambda = new NodejsFunction(this, 'ContactMailerLambda', {
      runtime: lambda.Runtime.NODEJS_18_X,
      entry: path.join(__dirname, '../lambda/contact-mailer.ts'),
      handler: 'handler',
      environment: {
        DESTINATION_EMAIL: 'pedromachado2298@gmail.com', 
        SOURCE_EMAIL: 'pedromachado2298@gmail.com'
      }
    });

    // Permitir Lambda enviar emails via SES
    mailerLambda.addToRolePolicy(new iam.PolicyStatement({
      actions: ['ses:SendEmail', 'ses:SendRawEmail'],
      resources: ['*'],
    }));

    // 4. API Gateway
    const api = new apigateway.RestApi(this, 'PortfolioApi', {
      restApiName: 'Portfolio Contact Service',
      defaultCorsPreflightOptions: {
        allowOrigins: apigateway.Cors.ALL_ORIGINS,
        allowMethods: apigateway.Cors.ALL_METHODS,
      }
    });

    const contactResource = api.root.addResource('contact');
    const contactIntegration = new apigateway.LambdaIntegration(mailerLambda);
    contactResource.addMethod('POST', contactIntegration);

    // 5. Outputs
    new cdk.CfnOutput(this, 'CloudFrontURL', {
      value: `https://${distribution.distributionDomainName}`,
      description: 'The URL of the deployed portfolio',
    });
    
    new cdk.CfnOutput(this, 'ApiGatewayEndpoint', {
      value: api.url,
      description: 'The API Gateway Endpoint URL for the contact form',
    });
  }
}
