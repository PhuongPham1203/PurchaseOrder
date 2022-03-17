USE [master]
GO
/****** Object:  Database [purchaseorder]    Script Date: 3/17/2022 15:48:56 ******/
CREATE DATABASE [purchaseorder]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'purchaseorder', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.PHAMPCSQLSERVER\MSSQL\DATA\purchaseorder.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'purchaseorder_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.PHAMPCSQLSERVER\MSSQL\DATA\purchaseorder_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [purchaseorder] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [purchaseorder].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [purchaseorder] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [purchaseorder] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [purchaseorder] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [purchaseorder] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [purchaseorder] SET ARITHABORT OFF 
GO
ALTER DATABASE [purchaseorder] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [purchaseorder] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [purchaseorder] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [purchaseorder] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [purchaseorder] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [purchaseorder] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [purchaseorder] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [purchaseorder] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [purchaseorder] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [purchaseorder] SET  ENABLE_BROKER 
GO
ALTER DATABASE [purchaseorder] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [purchaseorder] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [purchaseorder] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [purchaseorder] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [purchaseorder] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [purchaseorder] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [purchaseorder] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [purchaseorder] SET RECOVERY FULL 
GO
ALTER DATABASE [purchaseorder] SET  MULTI_USER 
GO
ALTER DATABASE [purchaseorder] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [purchaseorder] SET DB_CHAINING OFF 
GO
ALTER DATABASE [purchaseorder] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [purchaseorder] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [purchaseorder] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [purchaseorder] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'purchaseorder', N'ON'
GO
ALTER DATABASE [purchaseorder] SET QUERY_STORE = OFF
GO
USE [purchaseorder]
GO
/****** Object:  User [adminpurchaseorder]    Script Date: 3/17/2022 15:48:56 ******/
CREATE USER [adminpurchaseorder] FOR LOGIN [adminpurchaseorder] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [adminpurchaseorder]
GO
/****** Object:  Table [dbo].[part]    Script Date: 3/17/2022 15:48:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[part](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[part_number] [nvarchar](50) NULL,
	[part_descripttion] [nvarchar](50) NULL,
	[manufacturer] [nvarchar](50) NULL,
 CONSTRAINT [PK_part] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[purchase_order]    Script Date: 3/17/2022 15:48:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[purchase_order](
	[order_no] [int] IDENTITY(1,1) NOT NULL,
	[id_supplier] [int] NOT NULL,
	[order_date] [datetime] NULL,
	[last_update] [datetime] NULL,
	[sent_email] [bit] NULL,
	[cancel_po] [bit] NULL,
	[note] [nvarchar](500) NULL,
	[address] [nvarchar](500) NULL,
	[country] [nvarchar](255) NULL,
	[post_code] [nvarchar](50) NULL,
	[order_sent_to_email] [nvarchar](500) NULL,
	[order_sent_to_email_cc] [nvarchar](500) NULL,
	[email_subject] [nvarchar](255) NULL,
	[email_content] [ntext] NULL,
 CONSTRAINT [PK_purchase_order] PRIMARY KEY CLUSTERED 
(
	[order_no] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[purchase_order_line]    Script Date: 3/17/2022 15:48:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[purchase_order_line](
	[id_purchase_order] [int] NOT NULL,
	[id_part] [int] NOT NULL,
	[order_date] [datetime] NULL,
	[qty_ordered] [int] NULL,
	[qty_delivered] [int] NULL,
	[back_order] [bit] NULL,
	[m2_buy_price] [float] NULL,
	[memo] [nvarchar](255) NULL,
	[status] [bit] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[supplier]    Script Date: 3/17/2022 15:48:56 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[supplier](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[supplier_shortname] [nvarchar](255) NULL,
	[supplier_name] [nvarchar](255) NULL,
	[stock_site] [nvarchar](50) NULL,
	[stock_name] [nvarchar](50) NULL,
 CONSTRAINT [PK_supplier] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[part] ON 

INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (1, N'123y7qywe7', N'canon print x', N'Canon')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (2, N'18273876hk', N'canon print xxl', N'Canon')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (3, N'127huashd87', N'ram 8gb laptop', N'samsung')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (4, N'1weqjn2uhe', N'ram 16gb laptop', N'samsung')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (5, N'12178ysadhj', N'ram 8gb desktop', N'samsung')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (6, N'2enjk23hbah', N'ram 16gb desktop', N'samsung')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (7, N'asdjknkj2njka', N'cpu i5 10', N'intel')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (8, N'asdjnkj2jia44', N'cpu i7 10', N'intel')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (9, N'asdkjjih232hy', N'disk 500gb', N'kingmax')
INSERT [dbo].[part] ([id], [part_number], [part_descripttion], [manufacturer]) VALUES (10, N'asdh2324hjb', N'disk 1000gb', N'kingmax')
SET IDENTITY_INSERT [dbo].[part] OFF
GO
SET IDENTITY_INSERT [dbo].[purchase_order] ON 

INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (1, 1, CAST(N'2016-02-20T00:00:00.000' AS DateTime), CAST(N'2016-12-20T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (2, 1, CAST(N'2016-02-21T00:00:00.000' AS DateTime), CAST(N'2016-12-20T00:00:00.000' AS DateTime), 0, 0, N'note something', N'19 wasing', N'US', N'1829', NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (3, 2, CAST(N'2016-02-22T00:00:00.000' AS DateTime), CAST(N'2016-06-22T00:00:00.000' AS DateTime), 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (4, 3, CAST(N'2016-02-20T01:00:00.000' AS DateTime), CAST(N'2016-05-24T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (5, 4, CAST(N'2016-02-23T00:00:00.000' AS DateTime), CAST(N'2016-12-20T01:00:00.000' AS DateTime), 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (6, 5, CAST(N'2016-02-20T02:00:00.000' AS DateTime), CAST(N'2016-04-25T00:00:00.000' AS DateTime), 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (7, 6, CAST(N'2016-02-24T00:00:00.000' AS DateTime), CAST(N'2016-03-27T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (8, 1, CAST(N'2016-02-20T03:00:00.000' AS DateTime), CAST(N'2016-12-20T02:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (9, 2, CAST(N'2016-02-25T00:00:00.000' AS DateTime), CAST(N'2016-03-27T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (10, 3, CAST(N'2016-02-20T04:00:00.000' AS DateTime), CAST(N'2017-04-29T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (11, 4, CAST(N'2016-02-20T01:00:00.000' AS DateTime), CAST(N'2016-12-20T03:00:00.000' AS DateTime), 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (12, 5, CAST(N'2016-02-23T00:00:00.000' AS DateTime), CAST(N'2017-12-21T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (13, 6, CAST(N'2016-02-20T02:00:00.000' AS DateTime), CAST(N'2016-12-02T00:00:00.000' AS DateTime), 0, 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (14, 7, CAST(N'2016-02-24T00:00:00.000' AS DateTime), CAST(N'2016-12-20T04:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (15, 8, CAST(N'2016-02-20T03:00:00.000' AS DateTime), CAST(N'2016-11-03T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (16, 9, CAST(N'2016-02-25T00:00:00.000' AS DateTime), CAST(N'2016-10-05T00:00:00.000' AS DateTime), 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (17, 10, CAST(N'2016-02-20T04:00:00.000' AS DateTime), CAST(N'2016-12-20T05:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (18, 7, CAST(N'2016-02-26T00:00:00.000' AS DateTime), CAST(N'2016-09-06T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (19, 8, CAST(N'2016-02-20T05:00:00.000' AS DateTime), CAST(N'2016-08-08T00:00:00.000' AS DateTime), 1, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (20, 9, CAST(N'2016-02-20T01:00:00.000' AS DateTime), CAST(N'2016-12-20T06:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
INSERT [dbo].[purchase_order] ([order_no], [id_supplier], [order_date], [last_update], [sent_email], [cancel_po], [note], [address], [country], [post_code], [order_sent_to_email], [order_sent_to_email_cc], [email_subject], [email_content]) VALUES (21, 10, CAST(N'2016-02-23T00:00:00.000' AS DateTime), CAST(N'2016-07-10T00:00:00.000' AS DateTime), 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[purchase_order] OFF
GO
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (1, 1, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (2, 2, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 321.1, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (3, 3, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (4, 4, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (5, 5, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (6, 6, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (7, 7, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (8, 8, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (9, 9, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (10, 10, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (11, 1, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (12, 2, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (13, 3, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (14, 4, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (15, 5, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (16, 6, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (17, 7, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (18, 8, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (19, 9, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (20, 10, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 0, NULL, 1)
INSERT [dbo].[purchase_order_line] ([id_purchase_order], [id_part], [order_date], [qty_ordered], [qty_delivered], [back_order], [m2_buy_price], [memo], [status]) VALUES (2, 3, CAST(N'2017-07-19T00:00:00.000' AS DateTime), 1, 0, 1, 131.213, NULL, 1)
GO
SET IDENTITY_INSERT [dbo].[supplier] ON 

INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (1, N'INTEL', N'Intel Corporation', N'INTC', N'Intel Corporation')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (2, N'Samsung', N'Samsung Semiconductor', N'005930KRX', N'Samsung Electronics Co Ltd')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (3, N'Qualcomm', N'Qualcomm USA', N'QCOM', N'Qualcomm Inc')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (4, N'SKHynix', N'SK Hynix Inc', N'000660KRX', N'SK Hynix Inc')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (5, N'TexasIns', N'Texas Instruments', N'TXN', N'Texas Instruments Incorporated')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (6, N'Broadcom', N'Broadcom Inc', N'AVGO', N'Broadcom Inc')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (7, N'Micron', N'Micron Technology', N'MU', N'Micron Technology')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (8, N'TE', N'TE Connectivity', N'TEL', N'TEL')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (9, N'TDK', N'TDK Cor', N'6762TYO', N'TDK Corp')
INSERT [dbo].[supplier] ([id], [supplier_shortname], [supplier_name], [stock_site], [stock_name]) VALUES (10, N'MediaTek', N'Media Tek Inc', N'2454TPE', N'Media Tek Inc')
SET IDENTITY_INSERT [dbo].[supplier] OFF
GO
ALTER TABLE [dbo].[purchase_order] ADD  CONSTRAINT [DF_purchase_order_sent_email]  DEFAULT ((0)) FOR [sent_email]
GO
ALTER TABLE [dbo].[purchase_order] ADD  CONSTRAINT [DF_purchase_order_cancel_po]  DEFAULT ((0)) FOR [cancel_po]
GO
ALTER TABLE [dbo].[purchase_order_line] ADD  CONSTRAINT [DF_purchase_order_line_qty_order]  DEFAULT ((1)) FOR [qty_ordered]
GO
ALTER TABLE [dbo].[purchase_order_line] ADD  CONSTRAINT [DF_purchase_order_line_qty_delivered]  DEFAULT ((0)) FOR [qty_delivered]
GO
ALTER TABLE [dbo].[purchase_order_line] ADD  CONSTRAINT [DF_purchase_order_line_back_order]  DEFAULT ((1)) FOR [back_order]
GO
ALTER TABLE [dbo].[purchase_order_line] ADD  CONSTRAINT [DF_purchase_order_line_status]  DEFAULT ((1)) FOR [status]
GO
ALTER TABLE [dbo].[purchase_order]  WITH CHECK ADD  CONSTRAINT [FK_purchase_order_supplier] FOREIGN KEY([id_supplier])
REFERENCES [dbo].[supplier] ([id])
GO
ALTER TABLE [dbo].[purchase_order] CHECK CONSTRAINT [FK_purchase_order_supplier]
GO
ALTER TABLE [dbo].[purchase_order_line]  WITH CHECK ADD  CONSTRAINT [FK_purchase_order_line_part] FOREIGN KEY([id_part])
REFERENCES [dbo].[part] ([id])
GO
ALTER TABLE [dbo].[purchase_order_line] CHECK CONSTRAINT [FK_purchase_order_line_part]
GO
ALTER TABLE [dbo].[purchase_order_line]  WITH CHECK ADD  CONSTRAINT [FK_purchase_order_line_purchase_order] FOREIGN KEY([id_purchase_order])
REFERENCES [dbo].[purchase_order] ([order_no])
GO
ALTER TABLE [dbo].[purchase_order_line] CHECK CONSTRAINT [FK_purchase_order_line_purchase_order]
GO
USE [master]
GO
ALTER DATABASE [purchaseorder] SET  READ_WRITE 
GO
