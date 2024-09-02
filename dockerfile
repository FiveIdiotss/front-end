# Step 1: Node.js 기반 이미지 선택
FROM node:21-alpine AS builder

# Step 2: 작업 디렉토리 설정
WORKDIR /app

# Step 3: package.json과 lock 파일들을 복사하여 의존성 설치
COPY package*.json ./

# npm 설치
RUN npm install

# Step 4: 애플리케이션 소스 복사
COPY . .

# Step 5: Next.js 빌드
RUN npm run build

# Step 6: 프로덕션 실행 단계 설정
# 최종 실행 환경을 위한 Node.js 경량 이미지
FROM node:21-alpine AS runner

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 파일을 복사
COPY --from=builder /app ./

# 환경 변수를 설정하여 프로덕션 모드에서 실행되도록 함
ENV NODE_ENV=production

# 애플리케이션 실행 포트를 노출
EXPOSE 3000

# 애플리케이션 실행 명령어
CMD ["npm", "start"]




# # 이미지 생성
# FROM nginx

# # 오픈할 포트를 적어둔다.
# EXPOSE 3000

# RUN rm /etc/nginx/conf.d/default.conf
# RUN rm -rf /etc/nginx/conf.d/*

# # default.conf을 /etc/nginx/conf.d/ 경로에 있는 default.conf에 복사한다.
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# COPY --from=builder /app/out /usr/share/nginx/html